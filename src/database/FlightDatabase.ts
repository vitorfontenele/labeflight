import { FlightDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class FlightDatabase extends BaseDatabase {
    public static TABLE_FLIGHTS = "flights";

    public async findFlights(){
        const flightsDB : FlightDB[] = await BaseDatabase
            .connection(FlightDatabase.TABLE_FLIGHTS)
        
        return flightsDB;
    }
}