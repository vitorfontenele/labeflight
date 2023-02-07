import { FlightDatabase } from "../database/FlightDatabase"
import { PilotDatabase } from "../database/PilotDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Flight } from "../models/Flight";
import { FlightDB } from "../types";

export class FlightBusiness {
    public async getFlights() {
        const flightDatabase = new FlightDatabase();
        const flightsDB = await flightDatabase.findFlights();

        const flights : Flight[] = flightsDB.map(flightDB => new Flight(
            flightDB.id,
            flightDB.pilot_id,
            flightDB.departure_airport,
            flightDB.arrival_airport,
            flightDB.departure_time
        ))

        return flights;
    }

    public async getFlightById  (id : string) {
        const flightDatabase = new FlightDatabase();

        const flightDB = await flightDatabase.findFlightById(id);

        if (!flightDB){
            throw new NotFoundError ("Não há um voo com esse 'id'");
        }

        const flight = new Flight(
            flightDB.id,
            flightDB.pilot_id,
            flightDB.departure_airport,
            flightDB.arrival_airport,
            flightDB.departure_time
        )

        return flight;
    }

    public async createFlight (input : any) {
        const { id , pilotId , departureAirport , arrivalAirport , departureTime} = input;
        const flightDatabase = new FlightDatabase();
        const pilotDatabase = new PilotDatabase();
        

        if (typeof id !== "string"){
            throw new BadRequestError ("'id' deve ser uma string");
        }

        const flightExists = await flightDatabase.findFlightById(id);
        if (flightExists){
            throw new BadRequestError ("Já existe um voo com esse 'id'");
        }

        if (typeof pilotId !== "string"){
            throw new BadRequestError ("'pilotId' deve ser uma string");
        }

        const pilotExists = await pilotDatabase.findPilotById(pilotId);
        if (!pilotExists){
            throw new NotFoundError ("Não existe um piloto com esse 'pilotId'");
        }

        if (typeof departureAirport !== "string"){
            throw new BadRequestError ("'departureAirport' deve ser uma string");
        }

        if (typeof arrivalAirport !== "string"){
            throw new BadRequestError ("'arrivalAirport' deve ser uma string");
        }

        if (typeof departureTime !== "string"){
            throw new BadRequestError ("'departureTime' deve ser uma string");
        }

        const newFlight = new Flight(
            id,
            pilotId,
            departureAirport,
            arrivalAirport,
            departureTime
        );

        const newFlightDB : FlightDB = {
            id: newFlight.getId(),
            pilot_id: newFlight.getPilotId(),
            departure_airport: newFlight.getDepartureAirport(),
            arrival_airport: newFlight.getArrivalAirport(),
            departure_time: newFlight.getDepartureTime()
        }

        await flightDatabase.createFlight(newFlightDB);

        return newFlight;
    }

    public async updateFlightById (input : any, id : string) {
        // id do voo nao vai ser editado
        const newPilotId = input.pilotId;
        const newDepartureAirport = input.departureAirport;
        const newArrivalAirport = input.arrivalAirport;
        const newDepartureTime = input.departureTime;

        const flightDatabase = new FlightDatabase();
        const flightToUpdateDB = await flightDatabase.findFlightById(id);

        if (!flightToUpdateDB){
            throw new NotFoundError("Não há um voo com esse 'id'");
        }

        const pilotDatabase = new PilotDatabase();
        
        if (newPilotId !== undefined){
            if (typeof newPilotId !== "string"){
                throw new BadRequestError ("'pilotId' deve ser uma string");
            }

            const newPilotExists = await pilotDatabase.findPilotById(newPilotId);
            if (!newPilotExists){
                throw new NotFoundError ("Não existe um piloto com esse 'pilotId'");
            }
        }

        if (newDepartureAirport !== undefined){
            if (typeof newDepartureAirport !== "string"){
                throw new BadRequestError ("'departureAirport' deve ser uma string");
            }
        }

        if (newArrivalAirport !== undefined){
            if (typeof newArrivalAirport !== "string"){
                throw new BadRequestError ("'arrivalAirport' deve ser uma string");
            }
        }

        if (newDepartureTime !== undefined){
            if (typeof newDepartureTime !== "string"){
                throw new BadRequestError ("'departureTime' deve ser uma string");
            }
        }

        const updatedFlight = new Flight(
            id,
            newPilotId || flightToUpdateDB.pilot_id,
            newDepartureAirport || flightToUpdateDB.departure_airport,
            newArrivalAirport || flightToUpdateDB.arrival_airport,
            newDepartureTime || flightToUpdateDB.departure_time
        );

        const updatedFlightDB : FlightDB = {
            id: updatedFlight.getId(),
            pilot_id: updatedFlight.getPilotId(),
            departure_airport: updatedFlight.getDepartureAirport(),
            arrival_airport: updatedFlight.getArrivalAirport(),
            departure_time: updatedFlight.getDepartureTime()
        };

        await flightDatabase.updateFlightById(updatedFlightDB, id);

        return updatedFlight;
    };

    public async deleteFlightById (id : string) {
        const flightDatabase = new FlightDatabase();
        const flightDB = await flightDatabase.findFlightById(id);
        
        if (!flightDB){
            throw new NotFoundError("Não há um voo com esse 'id'");
        }

        const deletedFlight = new Flight(
            flightDB.id,
            flightDB.pilot_id,
            flightDB.departure_airport,
            flightDB.arrival_airport,
            flightDB.departure_time
        );

        await flightDatabase.deleteFlightById(id);

        return deletedFlight;
    }
}