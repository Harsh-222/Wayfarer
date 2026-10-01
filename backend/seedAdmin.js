import dotenv from "dotenv";
import mongoose from "mongoose";
import { ensureSetup } from "./utils/ensureSetup.js";

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);
await ensureSetup();
await mongoose.disconnect();
console.log("Setup complete.");
