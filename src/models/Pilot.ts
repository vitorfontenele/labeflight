export class Pilot {
    constructor(
        private id: string,
        private name: string,
        private flightHours: number
    ){}

    public getId(): string {
        return this.id
    }
    
    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getFlightHours() : number {
        return this.flightHours;
    }

    public setFlightHours(value : number) : void {
        this.flightHours = value;
    }
}