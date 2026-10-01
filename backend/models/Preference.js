import mongoose from "mongoose";
const preferenceSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  tripName:{type:String,default:"My Wayfarer Trip",trim:true},
  departureCity:{type:String,default:"",trim:true},
  destinationType:{type:String,enum:["beach","mountains","city","heritage","wildlife","adventure"],required:true},
  budget:{type:String,enum:["low","medium","high"],required:true},
  durationDays:{type:Number,required:true,min:1,max:30},
  interests:[{type:String}],
  travelMonth:{type:String,default:""},
  startDate:{type:String,default:""},
  groupType:{type:String,enum:["solo","couple","family","friends"],default:"solo"},
  accommodation:{type:String,enum:["budget","comfortable","premium"],default:"comfortable"},
  pace:{type:String,enum:["relaxed","balanced","packed"],default:"balanced"}
},{timestamps:true});
export default mongoose.model("Preference",preferenceSchema);
