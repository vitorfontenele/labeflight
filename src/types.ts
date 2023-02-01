export interface PilotDB {
    id: string,
    name: string,
    flight_hours: number
}

export interface FlightDB {
    id: string,
    pilot_id: string,
    departure_airport: string,
    arrival_airport: string,
    departure_time: string
}