import mongoose from "mongoose";

// Objective 1: Core schema — registered users of the platform
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // stored as bcrypt hash
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
