import { FlightDatabase } from "../database/FlightDatabase"
import { PilotDatabase } from "../database/PilotDatabase";
import { Flight } from "../models/Flight";
import { FlightDB } from "../types";

export class FlightBusiness {
    public getFlights = async() => {
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

    public getFlightById = async (id : string) => {
        const flightDatabase = new FlightDatabase();

        const flightDB = await flightDatabase.findFlightById(id);

        if (!flightDB){
            throw new Error ("Não há um voo com esse 'id'");
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

    public createFlight = async(input : any) => {
        const { id , pilotId , departureAirport , arrivalAirport , departureTime} = input;
        const flightDatabase = new FlightDatabase();
        const flightExists = await flightDatabase.findFlightById(id);
        const pilotDatabase = new PilotDatabase();
        const pilotExists = await pilotDatabase.findPilotById(pilotId);

        if (typeof id !== "string"){
            throw new Error ("'id' deve ser uma string");
        }

        if (flightExists){
            throw new Error ("Já existe um voo com esse 'id'");
        }

        if (typeof pilotId !== "string"){
            throw new Error ("'pilotId' deve ser uma string");
        }

        if (!pilotExists){
            throw new Error ("Não existe um piloto com esse 'pilotId'");
        }

        if (typeof departureAirport !== "string"){
            throw new Error ("'departureAirport' deve ser uma string");
        }

        if (typeof arrivalAirport !== "string"){
            throw new Error ("'arrivalAirport' deve ser uma string");
        }

        if (typeof departureTime !== "string"){
            throw new Error ("'departureTime' deve ser uma string");
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
}