import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Destination from "../models/Destination.js";
import destinations from "../data/destinations.js";

export async function ensureSetup(){
  const email=(process.env.ADMIN_EMAIL||"admin@wayfarer.com").toLowerCase().trim();
  const password=process.env.ADMIN_PASSWORD||"Admin@123";
  let admin=await User.findOne({email});
  const hash=await bcrypt.hash(password,10);
  if(!admin) admin=await User.create({name:"Wayfarer Admin",email,password:hash,role:"admin",status:"active"});
  else {admin.role="admin";admin.status="active";if(!(await bcrypt.compare(password,admin.password)))admin.password=hash;await admin.save();}

  for(const d of destinations){
    const existing=await Destination.findOne({name:d.name,country:d.country});
    if(!existing) await Destination.create(d);
    else if(typeof existing.image === "string" && existing.image.toLowerCase().endsWith(".svg")){
      // One-time migration for the old placeholder artwork. Do not overwrite
      // images an admin has intentionally changed.
      existing.image=d.image;
      await existing.save();
    }
  }
  console.log(`Wayfarer setup ready. Admin: ${email}. Destinations synced: ${destinations.length}.`);
}
