import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createItinerary,
  getMyItineraries,
  getItineraryById,
} from "../controllers/itineraryController.js";

const router = express.Router();

router.post("/", protect, createItinerary);
router.get("/", protect, getMyItineraries);
router.get("/:id", protect, getItineraryById);

export default router;
