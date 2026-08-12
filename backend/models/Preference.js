import mongoose from "mongoose";

// Objective 1: Stores each trip-planning request a user submits.
// This is the input record the recommendation logic (Phase 2, by BTech team) will consume.
const preferenceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destinationType: {
      type: String,
      enum: ["beach", "mountains", "city", "heritage", "wildlife", "adventure"],
      required: true,
    },
    budget: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    durationDays: { type: Number, required: true, min: 1, max: 30 },
    interests: [{ type: String }], // e.g. ["food", "nightlife", "trekking", "museums"]
    travelMonth: { type: String }, // optional, e.g. "December"
    groupType: {
      type: String,
      enum: ["solo", "couple", "family", "friends"],
      default: "solo",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Preference", preferenceSchema);
