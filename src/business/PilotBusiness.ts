import { PilotDatabase } from "../database/PilotDatabase";
import { Pilot } from "../models/Pilot";
import { PilotDB } from "../types";

export class PilotBusiness {
    public getPilots = async (q : string | undefined) => {
        const pilotDatabase = new PilotDatabase();
        const pilotsDB = await pilotDatabase.findPilots(q);

        const pilots : Pilot[] = pilotsDB.map(pilotDB => new Pilot (
            pilotDB.id,
            pilotDB.name,
            pilotDB.flight_hours
        ))

        return pilots;
    }

    public getPilotById = async(id : string) => {
        const pilotDatabase = new PilotDatabase();

        const pilotDB = await pilotDatabase.findPilotById(id);

        if (!pilotDB){
            throw new Error ("Não há um piloto com esse 'id'");
        }

        const pilot = new Pilot(
            pilotDB.id,
            pilotDB.name,
            pilotDB.flight_hours
        )

        return pilot;
    }

    public createPilot = async (input : any) => {
        const { id , name , flightHours } = input;
        const pilotDatabase = new PilotDatabase();

        if (typeof id !== "string"){
            throw new Error ("'id' deve existir e ser uma string");
        }

        const pilotExists = await pilotDatabase.findPilotById(id);
        if (pilotExists){
            throw new Error ("Já existe um piloto com esse 'id'");
        }

        if (typeof name !== "string"){
            throw new Error ("'name' deve existir e ser uma string");
        }

        if (name.length < 2){
            throw new Error ("'name' deve ter no mínimo 2 caracteres");
        }

        if (typeof flightHours !== "number"){
            throw new Error ("'flightHours' deve existir e ser um number");
        }

        if (flightHours <= 0){
            throw new Error ("'flightHours' deve ser maior do que zero");
        }

        const newPilot = new Pilot (
            id,
            name,
            flightHours
        );

        const newPilotDB : PilotDB = {
            id: newPilot.getId(),
            name: newPilot.getName(),
            flight_hours: newPilot.getFlightHours()
        };

        await pilotDatabase.createPilot(newPilotDB);

        return newPilot;
    }
    
}