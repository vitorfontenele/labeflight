export class Flight {
    constructor(
        private id: string,
        private pilotId: string,
        private departureAirport: string,
        private arrivalAirport: string,
        private departureTime: string
    ){}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getPilotId(): string {
        return this.pilotId
    }

    public setPilotId(value: string): void {
        this.pilotId = value
    }

    public getDepartureAirport(): string {
        return this.departureAirport
    }

    public setDepartureAirport(value: string): void {
        this.departureAirport = value
    }

    public getArrivalAirport() : string {
        return this.arrivalAirport;
    }

    public setArrivalAirport(value : string) : void {
        this.arrivalAirport = value;
    }

    public getDepartureTime() : string{
        return this.departureTime;
    }

    public setDepartureTime(value : string) : void{
        this.departureTime = value;
    }
}