import mongoose from "mongoose";

// Objective 1: Stores the itinerary generated for a preference request
const activitySchema = new mongoose.Schema(
  {
    time: { type: String }, // e.g. "Morning", "Afternoon", "Evening"
    title: { type: String, required: true },
    description: { type: String },
    estimatedCost: { type: Number, default: 0 },
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    activities: [activitySchema],
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    preference: { type: mongoose.Schema.Types.ObjectId, ref: "Preference", required: true },
    destinationName: { type: String, required: true },
    totalEstimatedCost: { type: Number, default: 0 },
    days: [daySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Itinerary", itinerarySchema);
