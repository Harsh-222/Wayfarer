import User from "../models/User.js";
import Itinerary from "../models/Itinerary.js";
import Destination from "../models/Destination.js";

const REAL_DESTINATION_IMAGES={
  "Goa":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Colva_Beach%2C_Goa%2C_India.jpg?width=1280",
  "Manali":"https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Himalayan_mountains_in_Manali%2C_Himachal_Pradesh.jpg?width=1280",
  "Jaipur":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Hawa_Mahal_.jpg?width=1280",
  "Bengaluru":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Vidhansoudha.jpg?width=1280",
  "Jim Corbett":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Images_of_Tiger_at_Jim_Corbett_National_Park.jpg?width=1280",
  "Rishikesh":"https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Ganga_at_Rishikesh.jpg?width=1280",
  "Udaipur":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Lake_Palace%2CUdaipur.jpg?width=1280",
  "Ladakh":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Ladakh%2C_pangong_lake.jpg?width=1280"
};
const resolveDestination=(d)=>{
  const x=d.toObject?d.toObject():{...d};
  const old=typeof x.image==='string' && (x.image.includes('/images/') || x.image.includes('images.unsplash.com'));
  if(REAL_DESTINATION_IMAGES[x.name] && (!x.image || old)) x.image=REAL_DESTINATION_IMAGES[x.name];
  return x;
};
export const stats=async(req,res)=>{const [users,itineraries,destinations,activeDestinations,admins]=await Promise.all([User.countDocuments(),Itinerary.countDocuments(),Destination.countDocuments(),Destination.countDocuments({active:true}),User.countDocuments({role:"admin"})]);res.json({stats:{users,itineraries,destinations,activeDestinations,admins}})};
export const listUsers=async(req,res)=>res.json({users:await User.find().select("-password").sort({createdAt:-1})});
export const updateUser=async(req,res)=>{const u=await User.findById(req.params.id);if(!u)return res.status(404).json({message:"User not found"});const{role,status,name}=req.body;if(name)u.name=name.trim();if(role)u.role=role;if(status)u.status=status;await u.save();res.json({user:await User.findById(u._id).select("-password")})};
export const deleteUser=async(req,res)=>{if(req.params.id===req.user._id.toString())return res.status(400).json({message:"You cannot delete your own admin account"});const u=await User.findByIdAndDelete(req.params.id);if(!u)return res.status(404).json({message:"User not found"});await Itinerary.deleteMany({user:u._id});res.json({message:"User and itineraries deleted"})};
export const listItineraries=async(req,res)=>res.json({itineraries:await Itinerary.find().populate("user","name email").sort({createdAt:-1})});
export const deleteItinerary=async(req,res)=>{const x=await Itinerary.findByIdAndDelete(req.params.id);if(!x)return res.status(404).json({message:"Itinerary not found"});res.json({message:"Itinerary deleted"})};
export const listDestinations=async(req,res)=>res.json({destinations:(await Destination.find().sort({featured:-1,name:1})).map(resolveDestination)});
export const createDestination=async(req,res)=>{try{res.status(201).json({destination:await Destination.create(req.body)})}catch(e){res.status(400).json({message:e.message})}};
export const updateDestination=async(req,res)=>{try{const d=await Destination.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!d)return res.status(404).json({message:"Destination not found"});res.json({destination:resolveDestination(d)})}catch(e){res.status(400).json({message:e.message})}};
export const deleteDestination=async(req,res)=>{const d=await Destination.findByIdAndDelete(req.params.id);if(!d)return res.status(404).json({message:"Destination not found"});res.json({message:"Destination deleted"})};
export const publicDestinations=async(req,res)=>{const {q,type,budget,featured}=req.query;const filter={active:true};if(type)filter.type=type;if(budget)filter.budgetLevel=budget;if(featured!==undefined)filter.featured=featured==="true";if(q)filter.$or=[{name:new RegExp(q,"i")},{country:new RegExp(q,"i")},{tags:new RegExp(q,"i")}];res.json({destinations:(await Destination.find(filter).sort({featured:-1,rating:-1,name:1})).map(resolveDestination)})};
export const publicDestinationById=async(req,res)=>{const d=await Destination.findOne({_id:req.params.id,active:true});if(!d)return res.status(404).json({message:"Destination not found"});res.json({destination:resolveDestination(d)})};
