import { Request , Response } from "express";
import { PilotBusiness } from "../business/PilotBusiness";

export class PilotController {
    public getPilots = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined;

            const pilotBusiness = new PilotBusiness();
            const output = await pilotBusiness.getPilots(q);

            res.status(200).send(output);
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

    public getPilotById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id; // string

            const pilotBusiness = new PilotBusiness();
            const output = await pilotBusiness.getPilotById(id);
            
            res.status(200).send(output); 
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

    public createPilot = async (req: Request, res: Response) => {
        try {
            const { id , name, flightHours } = req.body;

            const input = {
                id,
                name,
                flightHours
            };

            const pilotBusiness = new PilotBusiness();
            const output = await pilotBusiness.createPilot(input);

            res.status(201).send(output);
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