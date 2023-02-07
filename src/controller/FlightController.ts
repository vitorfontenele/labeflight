import { Request , Response } from "express";
import { FlightBusiness } from "../business/FlightBusiness";
import { BaseError } from "../errors/BaseError";

export class FlightController {
    public getFlights = async (req: Request, res: Response) => {
        try {
            const flightBusiness = new FlightBusiness();
            const output = await flightBusiness.getFlights();

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

    public getFlightById = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const flightBusiness = new FlightBusiness();
            const output = await flightBusiness.getFlightById(id);

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

    public createFlight = async(req: Request, res: Response) => {
        try {
            const { id , pilotId, departureAirport, arrivalAirport, departureTime } = req.body;

            const input = {
                id, 
                pilotId,
                departureAirport,
                arrivalAirport,
                departureTime
            }

            const flightBusiness = new FlightBusiness();
            const output = await flightBusiness.createFlight(input);

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
}