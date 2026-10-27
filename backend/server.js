import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import {ensureSetup} from "./utils/ensureSetup.js";

dotenv.config();
const app=express();
const allowed=(process.env.CLIENT_URL||"http://localhost:5173").split(",").map(x=>x.trim()).filter(Boolean);
const previewRe=/^https:\/\/wayfarer-frontend-[a-z0-9-]+\.vercel\.app$/;
app.use(cors({origin:(origin,cb)=>{if(!origin||allowed.includes(origin)||previewRe.test(origin))return cb(null,true);return cb(new Error("CORS blocked for this origin"));},credentials:true}));
app.use(express.json({limit:"1mb"}));
let ready;
function init(){ if(!ready) ready=connectDB().then(ensureSetup); return ready; }
app.use(async(req,res,next)=>{ try{ await init(); next(); }catch(e){ ready=null; console.error(e); res.status(500).json({message:"DB connection failed",error:e.message}); } });

app.use("/images", express.static(new URL("../frontend/public/images/", import.meta.url).pathname));
app.get("/api/health",(req,res)=>res.json({ok:true,service:"Wayfarer API",version:"4.0"}));
app.use("/api/auth",authRoutes);app.use("/api/itineraries",itineraryRoutes);app.use("/api/admin",adminRoutes);app.use("/api/destinations",destinationRoutes);
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:"Server error",error:err.message})});
if(!process.env.VERCEL){ const port=process.env.PORT||5000; init().then(()=>app.listen(port,()=>console.log(`Wayfarer API running on ${port}`))).catch(e=>{console.error(e);process.exit(1)}); }
export default app;
