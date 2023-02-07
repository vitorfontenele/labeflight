import { FlightDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class FlightDatabase extends BaseDatabase {
    public static TABLE_FLIGHTS = "flights";

    public async findFlights(){
        const flightsDB : FlightDB[] = await BaseDatabase
            .connection(FlightDatabase.TABLE_FLIGHTS)
        
        return flightsDB;
    }

    public async findFlightById(id : string){
        const [ result ] : FlightDB[] | undefined[] = await BaseDatabase
            .connection(FlightDatabase.TABLE_FLIGHTS)
            .where({ id });
        return result;
    }

    public async createFlight(newFlightDB : FlightDB){
        await BaseDatabase
            .connection(FlightDatabase.TABLE_FLIGHTS)
            .insert(newFlightDB);
    }

    public async deleteFlightById(id : string){
        await BaseDatabase
            .connection(FlightDatabase.TABLE_FLIGHTS)
            .del()
            .where({ id });
    }

    public async deleteFlightByPilotId(pilotId : string){
        await BaseDatabase
            .connection(FlightDatabase.TABLE_FLIGHTS)
            .del()
            .where({pilot_id: pilotId});
    }
}