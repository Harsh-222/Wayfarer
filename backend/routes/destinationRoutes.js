import express from "express";
import {publicDestinations,publicDestinationById} from "../controllers/adminController.js";
const router=express.Router();
router.get("/",publicDestinations);
router.get("/:id",publicDestinationById);
export default router;
