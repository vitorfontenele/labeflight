import { FlightDatabase } from "../database/FlightDatabase";
import { PilotDatabase } from "../database/PilotDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Pilot } from "../models/Pilot";
import { PilotDB } from "../types";

export class PilotBusiness {
    public async getPilots (q : string | undefined) {
        const pilotDatabase = new PilotDatabase();
        const pilotsDB = await pilotDatabase.findPilots(q);

        const pilots : Pilot[] = pilotsDB.map(pilotDB => new Pilot (
            pilotDB.id,
            pilotDB.name,
            pilotDB.flight_hours
        ))

        return pilots;
    }

    public async getPilotById (id : string) {
        const pilotDatabase = new PilotDatabase();

        const pilotDB = await pilotDatabase.findPilotById(id);

        if (!pilotDB){
            throw new NotFoundError ("Não há um piloto com esse 'id'");
        }

        const pilot = new Pilot(
            pilotDB.id,
            pilotDB.name,
            pilotDB.flight_hours
        )

        return pilot;
    }

    public async createPilot (input : any) {
        const { id , name , flightHours } = input;
        const pilotDatabase = new PilotDatabase();

        if (typeof id !== "string"){
            throw new BadRequestError ("'id' deve existir e ser uma string");
        }

        const pilotExists = await pilotDatabase.findPilotById(id);
        if (pilotExists){
            throw new BadRequestError ("Já existe um piloto com esse 'id'");
        }

        if (typeof name !== "string"){
            throw new BadRequestError ("'name' deve existir e ser uma string");
        }

        if (name.length < 2){
            throw new BadRequestError ("'name' deve ter no mínimo 2 caracteres");
        }

        if (typeof flightHours !== "number"){
            throw new BadRequestError ("'flightHours' deve existir e ser um number");
        }

        if (flightHours <= 0){
            throw new BadRequestError ("'flightHours' deve ser maior do que zero");
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

    public async updatePilotById (input : any, id : string){
        // id do piloto não vai ser atualizado
        const newName = input.name;
        const newFlightHours = input.flightHours;

        const pilotDatabase = new PilotDatabase();
        const pilotToUpdateDB = await pilotDatabase.findPilotById(id);

        if (!pilotToUpdateDB){
            throw new NotFoundError("Não há um piloto com esse 'id'");
        }

        if (newName !== undefined){
            if (typeof newName !== "string"){
                throw new BadRequestError("'name' precisa ser uma string");
            }
            if (newName.length < 2){
                throw new BadRequestError("'name' precisa ter no mínimo 2 caracteres");
            }
        }

        if (newFlightHours !== undefined){
            if (typeof newFlightHours !== "number"){
                throw new BadRequestError("'flightHours' precisa ser um number");
            }
            if (newFlightHours <= 0){
                throw new BadRequestError("'flightHours' precisa ser menor ou igual a zero");
            }
        }

        const updatedPilot = new Pilot(
            id,
            newName || pilotToUpdateDB.name,
            newFlightHours || pilotToUpdateDB.flight_hours
        )

        const updatedPilotDB : PilotDB = {
            id: updatedPilot.getId(),
            name: updatedPilot.getName(),
            flight_hours: updatedPilot.getFlightHours()
        }

        await pilotDatabase.updatePilotById(updatedPilotDB, id);

        return updatedPilot;
    }

    public async deletePilotById (id : string) {
        const pilotDatabase = new PilotDatabase();
        const flightDatabase = new FlightDatabase();
        const pilotDB = await pilotDatabase.findPilotById(id);

        if (!pilotDB){
            throw new NotFoundError("Não existe um piloto com esse 'id'");
        }

        // Deletar primeiro os voos que têm esse piloto
        await flightDatabase.deleteFlightByPilotId(id);
        // Deletando o piloto
        await pilotDatabase.deletePilotById(id);

        const deletedPilot = new Pilot(
            pilotDB.id,
            pilotDB.name,
            pilotDB.flight_hours
        );

        return deletedPilot;
    }
    
}