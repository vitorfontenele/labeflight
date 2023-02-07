import express from "express";
import { FlightController } from "../controller/FlightController";

const flightController = new FlightController();

export const flightRouter = express.Router();

flightRouter.get("/", flightController.getFlights);
flightRouter.get("/:id", flightController.getFlightById);
flightRouter.post("/", flightController.createFlight);