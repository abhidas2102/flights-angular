import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  constructor(private ff: FormBuilder, private flightService:FlightServiceService,private router: Router) { }

  checkIn = this.ff.group(
    {
      pnr:[]
    }
  );

  ngOnInit(): void {
  }

  
  doCheckIn(){
    if(this.checkIn.valid){
      this.flightService.showBookingDetails(this.checkIn).subscribe(res => {
        console.log(res["bookingStatus"])
        if(res["bookingStatus"]==='No'){
          this.flightService.doCheckIn(this.checkIn).subscribe()
          alert("Check In Successful!")
          this.router.navigate(['checkbooking']);
        }else{
          alert("Already Checked In!")
          this.router.navigate(['checkbooking']);
        }
      })
     
    }
  }

  /*datePast(){
    let date = new Date(this.checkIn["pnr"].slice(-8,-4)+"-"+this.showBookingDetails["pnr"].slice(-4,-2)+"-"+this.showBookingDetails["pnr"].slice(-2));
    let today = new Date(formatDate(new Date(),'yyyy-MM-dd','en-US'))

    if(date.getTime() < today.getTime()){
      return false
    } else {
      return true
    }
  }*/

}
