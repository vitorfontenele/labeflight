import express from "express";
import { PilotController } from "../controller/PilotController";

const pilotController = new PilotController();

export const pilotRouter = express.Router();

pilotRouter.get("/", pilotController.getPilots);
pilotRouter.get("/:id", pilotController.getPilotById);
pilotRouter.post("/", pilotController.createPilot);
pilotRouter.delete("/:id", pilotController.deletePilotById);