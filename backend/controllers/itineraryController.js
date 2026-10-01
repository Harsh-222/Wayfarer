import Preference from "../models/Preference.js";
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
const realImage=(name,image)=>REAL_DESTINATION_IMAGES[name] || image || "/images/fallback.svg";
const normalizeItinerary=(x)=>{
  const o=x.toObject?x.toObject():{...x};
  o.destinationImage=realImage(o.destinationName,o.destinationImage);
  return o;
};

const score=(d,p)=>{
 let s=0;
 if(d.type===p.destinationType)s+=8;
 if(d.budgetLevel===p.budget)s+=5;
 s+=(p.interests||[]).filter(x=>(d.tags||[]).map(t=>t.toLowerCase()).includes(x.toLowerCase())).length*3;
 if(p.travelMonth && (d.bestMonths||[]).includes(p.travelMonth))s+=3;
 if(p.pace==="relaxed" && d.type!=="adventure")s+=1;
 return s;
};
const buildDays=(d,n,pace)=>{
 const source=d.activities?.length?d.activities:[{title:"Explore the destination",description:"Free exploration and local discovery.",cost:0,time:"Daytime",category:"Explore"}];
 const perDay=pace==="packed"?3:pace==="relaxed"?2:2;
 return Array.from({length:n},(_,i)=>{
   const acts=[];for(let j=0;j<perDay;j++){const a=source[(i*perDay+j)%source.length];acts.push({time:a.time||"Daytime",title:a.title,description:a.description,estimatedCost:a.cost||0,category:a.category||"Experience"});}
   return {day:i+1,title:i===0?`Arrival & ${d.name}`:`Explore ${d.name}`,activities:acts};
 });
};
const budgetBreakdown=(total,budget)=>{const activities=Math.round(total*.35),food=Math.round(total*.30),localTransport=Math.round(total*.20),buffer=total-activities-food-localTransport;return {activities,food,localTransport,buffer,accommodationNote:budget==="low"?"Budget stays and hostels":budget==="high"?"Premium hotels or resorts":"Comfortable hotels or homestays"};};
export const createItinerary=async(req,res)=>{
 try{
  const {tripName="My Wayfarer Trip",departureCity="",destinationType,budget,durationDays,interests=[],travelMonth="",startDate="",groupType="solo",accommodation="comfortable",pace="balanced"}=req.body;
  const days=Number(durationDays);
  if(!destinationType||!budget||!days||days<1||days>30)return res.status(400).json({message:"Choose a destination style, budget and duration from 1-30 days."});
  const preference=await Preference.create({user:req.user._id,tripName,departureCity,destinationType,budget,durationDays:days,interests,travelMonth,startDate,groupType,accommodation,pace});
  const candidates=await Destination.find({active:true});
  if(!candidates.length){await Preference.findByIdAndDelete(preference._id);return res.status(400).json({message:"No destinations are available. Ask an admin to add destinations."});}
  const ranked=candidates.map(d=>({d,score:score(d,preference)})).sort((a,b)=>b.score-a.score);
  const best=ranked[0].d;
  const itineraryDays=buildDays(best,days,pace);
  const activityCost=itineraryDays.reduce((sum,day)=>sum+day.activities.reduce((s,a)=>s+a.estimatedCost,0),0);
  const baseDaily=best.estimatedDailyBudget||1500;
  const multiplier=accommodation==="budget"?.75:accommodation==="premium"?1.55:1;
  const totalEstimatedCost=Math.round((activityCost+(baseDaily*days*multiplier*.55)));
  const itinerary=await Itinerary.create({user:req.user._id,preference:preference._id,tripName,destinationName:best.name,destinationImage:realImage(best.name,best.image),summary:`A ${days}-day ${pace} ${groupType} trip to ${best.name}, matched to your ${budget} budget and interests.`,durationDays:days,groupType,startDate,totalEstimatedCost,budgetBreakdown:budgetBreakdown(totalEstimatedCost,budget),travelTips:best.travelTips||[],packingList:["Comfortable walking shoes","Reusable water bottle","Power bank","Personal medicines","Weather-appropriate layers","Government ID"],days:itineraryDays});
  res.status(201).json({preference,itinerary,recommendations:ranked.slice(0,3).map(x=>({name:x.d.name,image:realImage(x.d.name,x.d.image),type:x.d.type,score:x.score}))});
 }catch(e){res.status(500).json({message:"Failed to generate itinerary",error:e.message})}
};
export const getMyItineraries=async(req,res)=>{try{res.json({itineraries:(await Itinerary.find({user:req.user._id}).populate("preference").sort({createdAt:-1})).map(normalizeItinerary)})}catch(e){res.status(500).json({message:e.message})}};
export const getItineraryById=async(req,res)=>{try{const x=await Itinerary.findOne({_id:req.params.id,user:req.user._id}).populate("preference");if(!x)return res.status(404).json({message:"Itinerary not found"});res.json({itinerary:normalizeItinerary(x)})}catch(e){res.status(404).json({message:"Itinerary not found"})}};
export const deleteMyItinerary=async(req,res)=>{try{const x=await Itinerary.findOneAndDelete({_id:req.params.id,user:req.user._id});if(!x)return res.status(404).json({message:"Itinerary not found"});await Preference.findByIdAndDelete(x.preference);res.json({message:"Itinerary deleted"})}catch(e){res.status(500).json({message:e.message})}};
