import express from "express";
import protect,{adminOnly} from "../middleware/authMiddleware.js";
import * as a from "../controllers/adminController.js";
const router=express.Router(); router.use(protect,adminOnly);
router.get("/stats",a.stats); router.get("/users",a.listUsers); router.patch("/users/:id",a.updateUser); router.delete("/users/:id",a.deleteUser);
router.get("/itineraries",a.listItineraries); router.delete("/itineraries/:id",a.deleteItinerary);
router.get("/destinations",a.listDestinations); router.post("/destinations",a.createDestination); router.patch("/destinations/:id",a.updateDestination); router.delete("/destinations/:id",a.deleteDestination);
export default router;
