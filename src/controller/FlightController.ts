import { Request , Response } from "express";
import { FlightDatabase } from "../database/FlightDatabase";
import { Flight } from "../models/Flight";
import { FlightDB } from "../types";

export class FlightController {
    public getFlights = async (req: Request, res: Response) => {
        try {
            const flightDatabase = new FlightDatabase();
            const flightsDB : FlightDB[] = await flightDatabase.findFlights();

            const flights : Flight[] = flightsDB.map(flightDB => new Flight(
                flightDB.id,
                flightDB.pilot_id,
                flightDB.departure_airport,
                flightDB.arrival_airport,
                flightDB.departure_time
            ));

            res.status(200).send(flights);
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}