import mongoose from "mongoose";
const activitySchema=new mongoose.Schema({time:{type:String},title:{type:String,required:true},description:{type:String},estimatedCost:{type:Number,default:0},category:{type:String,default:"Experience"}},{_id:false});
const daySchema=new mongoose.Schema({day:{type:Number,required:true},title:{type:String,default:"Explore"},activities:[activitySchema]},{_id:false});
const itinerarySchema=new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},preference:{type:mongoose.Schema.Types.ObjectId,ref:"Preference",required:true},
 tripName:{type:String,default:"My Trip"},destinationName:{type:String,required:true},destinationImage:{type:String,default:""},summary:{type:String,default:""},durationDays:{type:Number,default:1},groupType:{type:String,default:"solo"},startDate:{type:String,default:""},
 totalEstimatedCost:{type:Number,default:0},budgetBreakdown:{type:Object,default:{}},travelTips:[{type:String}],packingList:[{type:String}],days:[daySchema]
},{timestamps:true});
export default mongoose.model("Itinerary",itinerarySchema);
