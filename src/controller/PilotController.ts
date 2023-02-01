import { Request , Response } from "express";
import { PilotDatabase } from "../database/PilotDatabase";
import { Pilot } from "../models/Pilot";
import { PilotDB } from "../types";

export class PilotController {
    public getPilots = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined;

            const pilotDatabase = new PilotDatabase();
            const pilotsDB = await pilotDatabase.findPilots(q);

            const pilots : Pilot[] = pilotsDB.map(pilotDB => new Pilot (
                pilotDB.id,
                pilotDB.name,
                pilotDB.flight_hours
            ))

            res.status(200).send(pilots);
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