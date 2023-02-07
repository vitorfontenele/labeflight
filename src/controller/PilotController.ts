import { Request , Response } from "express";
import { PilotBusiness } from "../business/PilotBusiness";
import { BaseError } from "../errors/BaseError";

export class PilotController {
    public getPilots = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined;

            const pilotBusiness = new PilotBusiness();
            const output = await pilotBusiness.getPilots(q);

            res.status(200).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
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

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
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

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }   
        }
    }

    public updatePilotById = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { name , flightHours } = req.body;

            const input = {
                name,
                flightHours
            }

            const pilotBusiness = new PilotBusiness();
            const output = await pilotBusiness.updatePilotById(input, id);

            res.status(200).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }   
        }
    }

    public deletePilotById = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const pilotBusiness = new PilotBusiness();
            const output = await pilotBusiness.deletePilotById(id);

            res.status(200).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
    }
}