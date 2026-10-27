import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const tokenFor = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
const safeUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, status: u.status, createdAt: u.createdAt });

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    const normalized = email.toLowerCase().trim();
    if (await User.findOne({ email: normalized })) return res.status(409).json({ message: "An account with this email already exists" });
    const isAdmin = normalized === (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
    const user = await User.create({ name, email: normalized, password: await bcrypt.hash(password, 10), role: isAdmin ? "admin" : "user" });
    res.status(201).json({ user: safeUser(user), token: tokenFor(user) });
  } catch (e) { res.status(500).json({ message: "Registration failed", error: e.message }); }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ message: "Invalid email or password" });
    if (user.status === "blocked") return res.status(403).json({ message: "Your account is blocked" });
    res.json({ user: safeUser(user), token: tokenFor(user) });
  } catch (e) { res.status(500).json({ message: "Login failed", error: e.message }); }
};

export const getMe = async (req, res) => res.json({ user: safeUser(req.user) });

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) req.user.name = name.trim();
    await req.user.save();
    res.json({ user: safeUser(req.user) });
  } catch (e) { res.status(500).json({ message: "Profile update failed", error: e.message }); }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ message: "Current and new passwords are required" });
    if (newPassword.length < 6) return res.status(400).json({ message: "New password must be at least 6 characters" });
    if (!(await bcrypt.compare(currentPassword, req.user.password))) return res.status(401).json({ message: "Current password is incorrect" });
    req.user.password = await bcrypt.hash(newPassword, 10);
    await req.user.save();
    res.json({ message: "Password changed successfully" });
  } catch (e) { res.status(500).json({ message: "Password change failed", error: e.message }); }
};
