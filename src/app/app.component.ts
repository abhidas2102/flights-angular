import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private ff: FormBuilder) { }

  searchFlightForm = this.ff.group(
    {
      origin: ['delhi'],
      destination: ['chennai'],
      flightDate: ['2021-08-14'],
      persons: [3]
    }
  );

  searchFlightNumber= this.ff.group(
    {
      flightNumber:['IN640'],
      flightDate:['2021-08-14']
    }
  )

  title = 'flights';

  responseArray:any=[];
  results:boolean=false;
  noFlights:boolean=false;
  continueBooking:boolean=false;
  searchFlightbyPersonON:boolean=true;

  dummyFlight={
    flightNumber: 'IN640',
    airlineName: 'Indigo',
    duration: 120,
    fare: 5000,
    availableSeats: 50
    }

  searchFlightbyPerson(){
    console.log(">>>>Getting Searched")
    this.responseArray=[]
    this.results=false
    this.noFlights=false
    this.continueBooking=false;
    this.responseArray.push(this.dummyFlight);
    if(this.responseArray.length>0){
      this.results=true;
    } else {
      this.noFlights=true;
    }
  }

  searchFlightbyNumber(){
    console.log(">>>Search by Number")
    this.responseArray=[]
    this.results=false
    this.noFlights=false
    this.continueBooking=false;
    this.responseArray.push(this.dummyFlight);
    if(this.responseArray.length>0){
      this.results=true;
    } else {
      this.noFlights=true;
    }
  }

  continueBookingTrigger(){
    this.continueBooking=true;
    this.results=false
  }

  toggleSearch(){
    this.searchFlightbyPersonON= !this.searchFlightbyPersonON;
    this.responseArray=[]
    this.results=false
    this.noFlights=false
    this.continueBooking=false;
  }

  ngOnInit(): void {
  }
}
