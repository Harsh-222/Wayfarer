import mongoose from "mongoose";
const activitySchema=new mongoose.Schema({title:{type:String,required:true,trim:true},description:{type:String,default:""},cost:{type:Number,default:0,min:0},time:{type:String,default:"Morning"},category:{type:String,default:"Experience"}},{_id:false});
const destinationSchema=new mongoose.Schema({
 name:{type:String,required:true,trim:true},country:{type:String,required:true,trim:true},type:{type:String,enum:["beach","mountains","city","heritage","wildlife","adventure"],required:true},budgetLevel:{type:String,enum:["low","medium","high"],required:true},description:{type:String,default:""},image:{type:String,default:""},tags:[{type:String}],activities:[activitySchema],featured:{type:Boolean,default:false},active:{type:Boolean,default:true},rating:{type:Number,default:4.7,min:0,max:5},bestMonths:[{type:String}],estimatedDailyBudget:{type:Number,default:1500},highlights:[{type:String}],travelTips:[{type:String}]
},{timestamps:true});
export default mongoose.model("Destination",destinationSchema);
