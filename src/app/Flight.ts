export class Flight{
    flightNumber:string;
	airlineName:string;
	duration:string;
	fare:number;
	availableSeats:number;
	source:string;
	destination:string;

    constructor(flight:any){
        this.flightNumber = flight.flightNumber;
		this.airlineName = flight.airlineName;
		this.duration = flight.duration;
		this.fare = flight.fare;
		this.availableSeats = flight.availableSeats;
		this.source = flight.source;
		this.destination = flight.destination;
    }
}