import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-save-flight',
  templateUrl: './save-flight.component.html',
  styleUrls: ['./save-flight.component.scss']
})
export class SaveFlightComponent implements OnInit {

  flight:any

  constructor(private ff: FormBuilder,private flightService:FlightServiceService, private router:Router) { }

  originCities=['Bangalore','Kolkata','Mumbai','Pune','Hyderabad','Chennai','Delhi','Ahmedabad','Bhubaneswar']
  
  saveFlightForm = this.ff.group(
    {
      flightNumber:['',[Validators.required]],
      airlineName:['',[Validators.required]],
      duration:['',[Validators.required]],
      fare:['',[Validators.required]],
      availableSeats:['',[Validators.required]],
      source:['',[Validators.required]],
      destination:['',[Validators.required]],
      flightSchedule:[[]]
    }
  )

  saveFlight(){
    console.log(this.saveFlightForm.value)
    if(this.saveFlightForm.valid){
      this.saveFlightForm.value.flightNumber = this.saveFlightForm.value.flightNumber.toUpperCase()
      this.saveFlightForm.value.airlineName = this.saveFlightForm.value.airlineName.toUpperCase()
      let flightData = JSON.stringify(this.saveFlightForm.value);
      this.flightService.saveFlight(flightData).subscribe()
      sessionStorage.removeItem("flight")
      alert("Flight created succesfully!")
      this.router.navigate(['search']);
    }else{
      alert("Fill the form correctly!")
    }
  }

  ngOnInit(): void {
    this.flight = JSON.parse(sessionStorage.getItem('flight') || '{}');
    this.saveFlightForm.patchValue(this.flight)
    if(this.flight){
      this.removeOriginOrDestination(this.flight.source)
      this.removeOriginOrDestination(this.flight.destination)
    }
  }

  removeOriginOrDestination(element: any) {
    this.originCities.forEach((value,index)=>{
        if(value==element) this.originCities.splice(index,1);
    });
  }

}
