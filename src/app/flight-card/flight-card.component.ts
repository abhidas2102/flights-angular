import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from '../authentication.service';
import { Flight } from '../Flight';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {

  @Input()
  flight:any;

  role:string='';
  showAdmin:boolean=false;

  @Output()
  continueBookingTrigger:EventEmitter<string> = new EventEmitter<string>();

  continueBooking(value: any){
    if(this.flight.flightSchedule.length > 0)
    this.continueBookingTrigger.emit(value);
    else
    alert('No schedule available ! Search for another date !')
  }

  editFlight(flight:any){
    sessionStorage.setItem("flight",JSON.stringify(flight));
    this.router.navigate(['/saveFlight']);
  }

  constructor(private router: Router,private auth:AuthenticationService) { }

  ngOnInit(): void {
    let jwt:any = jwtDecode(sessionStorage.getItem("token") || '')
    this.role = jwt["role"];
    if(this.role==="ADMIN"){
      this.showAdmin= true;
    }
  }

  isLoggedIn(){
    return this.auth.isUserLoggedIn()
  }

}
