import Preference from "../models/Preference.js";
import Itinerary from "../models/Itinerary.js";
import destinations from "../data/destinations.js";

// Objective 4: Simple, transparent rule-based matcher for Phase 1.
// It scores every seeded destination against the submitted preference and
// picks the best match. The BTech team's Phase 2 algorithm can replace this
// function's internals without touching the API contract below.
const scoreDestination = (destination, preference) => {
  let score = 0;

  if (destination.type === preference.destinationType) score += 5;
  if (destination.budgetLevel === preference.budget) score += 3;

  const interestOverlap = (preference.interests || []).filter((interest) =>
    destination.tags.includes(interest.toLowerCase())
  ).length;
  score += interestOverlap * 2;

  return score;
};

const buildDayPlan = (destination, durationDays) => {
  const days = [];
  const pool = destination.activities;

  for (let dayNum = 1; dayNum <= durationDays; dayNum++) {
    // cycle through the activity pool so short seed data still covers longer trips
    const first = pool[(dayNum * 2 - 2) % pool.length];
    const second = pool[(dayNum * 2 - 1) % pool.length];

    days.push({
      day: dayNum,
      activities: [
        { time: "Morning", title: first.title, description: "", estimatedCost: first.cost },
        { time: "Evening", title: second.title, description: "", estimatedCost: second.cost },
      ],
    });
  }
  return days;
};

// Objective 4 & 5: Create a Preference record, generate an Itinerary from it,
// and return both — this is the core end-to-end flow of Phase 1.
export const createItinerary = async (req, res) => {
  try {
    const { destinationType, budget, durationDays, interests, travelMonth, groupType } = req.body;

    if (!destinationType || !budget || !durationDays) {
      return res.status(400).json({
        message: "destinationType, budget and durationDays are required",
      });
    }

    const preference = await Preference.create({
      user: req.user.id,
      destinationType,
      budget,
      durationDays,
      interests: interests || [],
      travelMonth,
      groupType,
    });

    // pick the best-scoring seeded destination
    const ranked = destinations
      .map((d) => ({ destination: d, score: scoreDestination(d, preference) }))
      .sort((a, b) => b.score - a.score);

    const bestMatch = ranked[0].destination;
    const days = buildDayPlan(bestMatch, durationDays);
    const totalEstimatedCost = days.reduce(
      (sum, day) => sum + day.activities.reduce((s, a) => s + a.estimatedCost, 0),
      0
    );

    const itinerary = await Itinerary.create({
      user: req.user.id,
      preference: preference._id,
      destinationName: bestMatch.name,
      totalEstimatedCost,
      days,
    });

    return res.status(201).json({ preference, itinerary });
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate itinerary", error: error.message });
  }
};

// Objective 5: List the logged-in user's past itineraries (dashboard/history view)
export const getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id })
      .populate("preference")
      .sort({ createdAt: -1 });
    return res.status(200).json({ itineraries });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch itineraries", error: error.message });
  }
};

// Objective 5: Fetch a single itinerary by id
export const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({ _id: req.params.id, user: req.user.id }).populate(
      "preference"
    );
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
    return res.status(200).json({ itinerary });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch itinerary", error: error.message });
  }
};
