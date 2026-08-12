import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/plan");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber mb-3">Join Wayfarer</p>
      <h1 className="font-display text-3xl mb-8">Create your account</h1>

      {error && (
        <div className="bg-stamp/10 border border-stamp text-stamp text-sm rounded-lg px-4 py-3 mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-paper/60">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 w-full bg-transparent border border-paper/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-paper/60">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 w-full bg-transparent border border-paper/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-paper/60">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-2 w-full bg-transparent border border-paper/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber"
            placeholder="At least 6 characters"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber text-navy font-mono font-bold uppercase text-sm tracking-wide py-3 rounded-full hover:brightness-110 transition disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create account"}
        </button>
      </form>

      <p className="text-paper/60 text-sm mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-amber hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
