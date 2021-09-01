import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-schedule-flight',
  templateUrl: './schedule-flight.component.html',
  styleUrls: ['./schedule-flight.component.scss']
})
export class ScheduleFlightComponent implements OnInit {

  constructor(private ff: FormBuilder,private flightService:FlightServiceService,private router:Router) { }

  flight:any
  scheduleDate:string = ''

  scheduleForm = this.ff.group({
    depertureTime:['',[Validators.required]],
    scheduleDate:['',[Validators.required]]
  })

  scheduleInput = {
    depertureTime:'',
    scheduleDate:''
  }

  scheduleFlight(){
    if(this.scheduleForm.valid){
      let schedule = JSON.stringify(this.scheduleForm.value);
      this.flightService.scheduleFlight(schedule,this.flight["flightNumber"]).subscribe()
      alert("Flight schedule saved successfully!")
      this.router.navigate(['search']);
    }
  }

  ngOnInit(): void {
    this.flight = JSON.parse(sessionStorage.getItem('flight') || '{}');
    this.scheduleDate = sessionStorage.getItem('scheduleDate') || ''
    this.scheduleInput.scheduleDate = this.scheduleDate.substring(1,this.scheduleDate.length-1)
    this.scheduleForm.patchValue(this.scheduleInput)
  }

}
