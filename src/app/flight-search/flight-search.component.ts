import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from '../authentication.service';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {
  constructor(private ff: FormBuilder,private flightService:FlightServiceService,
    private router: Router,private auth: AuthenticationService) { }

  searchFlightForm = new FormGroup(
    {
      origin: new FormControl('Select Source',Validators.required),
      destination: new FormControl('Select Destination',Validators.required),
      flightDate: new FormControl('',Validators.required),
      persons: new FormControl('',Validators.required)
    }
  );

  searchFlightNumber= this.ff.group(
    {
      flightNumber:['',[Validators.required]],
      flightDate:['',[Validators.required]]
    }
  )

  title = 'flights';

  role:string='';
  minDate:string = formatDate(new Date(),'yyyy-MM-dd','en-US')
  showAdmin:boolean=false;
  persons:number=1;
  responseArray:any=[];
  flightDetails:any;
  results:boolean=false;
  noFlights:boolean=false;
  continueBooking:boolean=false;
  searchFlightbyPersonON:boolean=true;
  scheduleAvailable:boolean=false;
  originCities=['Bangalore','Kolkata','Mumbai','Pune','Hyderabad','Chennai','Delhi','Ahmedabad','Bhubaneswar']
  //destinationCities=['Bangalore','Mumbai','Pune','Hyderabad','Chennai','Delhi','Ahmedabad','Bhubaneswar']

  dummyFlight={
    flightNumber: 'IN640',
    airlineName: 'Indigo',
    duration: 120,
    fare: 5000,
    availableSeats: 50
    }

  searchFlightbyPerson(){
    
    if(this.searchFlightForm.value.origin === this.searchFlightForm.value.destination || 
      this.searchFlightForm.value.origin === "Select Source" || 
      this.searchFlightForm.value.destination=== "Select Destination"){
        alert("Select source & destination correctly !")
    }
    else if(this.searchFlightForm.valid){
      this.responseArray=[]
      this.results=false
      this.noFlights=false
      this.continueBooking=false;
      this.scheduleAvailable=false;
      this.persons=1;

      console.log(this.responseArray)

      let searchQuery = JSON.stringify(this.searchFlightForm.value);
      console.log(searchQuery)
      this.flightService.searchFlightByPersons(searchQuery).subscribe(res => {
        this.responseArray=res
        if(this.responseArray.length>0){
          this.results=true;
          this.persons = this.searchFlightForm.value.persons;
          if(this.responseArray[0]["flightSchedule"].length > 0){
            this.scheduleAvailable=true;
          }
        } else {
          this.noFlights=true;
        }
      })
    } else {
      alert('Fill the form correctly')
    }
  }

  searchFlightbyNumber(){
    if(this.searchFlightNumber.valid){
      this.searchFlightNumber.value.flightNumber = this.searchFlightNumber.value.flightNumber.toUpperCase()
      this.responseArray=[]
      this.results=false
      this.noFlights=false
      this.continueBooking=false;
      this.scheduleAvailable=false;

      let searchQuery = JSON.stringify(this.searchFlightNumber.value);
      console.log(searchQuery)
      this.flightService.searchFlightByFlightNumber(searchQuery).subscribe(res => {
        if(res != null){
          this.responseArray.push(res)
        }
        if(this.responseArray.length>0){
          this.results=true;
          this.adminTrue()
          if(this.responseArray[0]["flightSchedule"].length > 0){
            this.scheduleAvailable=true;
          }
        } else {
          this.noFlights=true;
        }
      })
    }else {
      alert('Fill the form correctly')
    }
  }

  continueBookingTrigger(flight: any){
    this.continueBooking=true;
    this.flightDetails = flight;
    this.results=false
  }

  toggleSearch(){
    this.searchFlightbyPersonON= !this.searchFlightbyPersonON;
    this.responseArray=[]
    this.results=false
    this.noFlights=false
    this.continueBooking=false;
    this.scheduleAvailable=false;
  }

  goToScheduleFlightPage(){
    console.log(this.responseArray)
    sessionStorage.setItem("flight",JSON.stringify(this.responseArray[0]));
    sessionStorage.setItem("scheduleDate",JSON.stringify(this.searchFlightNumber.value.flightDate))
    this.router.navigate(['/scheduleFlight']);
  }

  adminTrue(){
    if(this.auth.isUserLoggedIn()){
      let jwt:any = jwtDecode(sessionStorage.getItem("token") || '')
      this.role = jwt["role"];
      if(this.role==="ADMIN"){
        this.showAdmin= true;
      }
    }
  }

  ngOnInit(): void {
    this.adminTrue()
  }
}
