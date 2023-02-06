import { PilotDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PilotDatabase extends BaseDatabase {
    public static TABLE_PILOTS = "pilots";

    public async findPilots(q: string | undefined){
        let pilotsDB;

        if (q){
            const result : PilotDB[] = await BaseDatabase
                .connection(PilotDatabase.TABLE_PILOTS)
                .where("name", "LIKE", `%${q}%`)
            pilotsDB = result;  
        } else {
            const result : PilotDB[] = await BaseDatabase
                .connection(PilotDatabase.TABLE_PILOTS)
            pilotsDB = result;
        }

        return pilotsDB;        
    }

    public async findPilotById(id : string){
        const [ result ] : PilotDB[] | undefined[] = await BaseDatabase
            .connection(PilotDatabase.TABLE_PILOTS)
            .where({ id });
        return result;
    }

    public async createPilot(newPilotDB : PilotDB){
        await BaseDatabase
            .connection(PilotDatabase.TABLE_PILOTS)
            .insert(newPilotDB);
    }
}