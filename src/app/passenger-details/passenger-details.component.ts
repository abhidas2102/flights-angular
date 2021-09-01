import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent implements OnInit {

  constructor(private ff: FormBuilder, private flightService:FlightServiceService, private router:Router) { }

  passengerDetailsForm1 = this.ff.group(
    {
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender:['',Validators.required],
      age:['',Validators.required]
    }
  );

  passengerDetailsForm2 = this.ff.group(
    {
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender:['',Validators.required],
      age:['',Validators.required]
    }
  );

  passengerDetailsForm3 = this.ff.group(
    {
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender:['',Validators.required],
      age:['',Validators.required]
    }
  );

  passengerDetailsForm4 = this.ff.group(
    {
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender:['',Validators.required],
      age:['',Validators.required]
    }
  );

  passengerDetailsForm5 = this.ff.group(
    {
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender:['',Validators.required],
      age:['',Validators.required]
    }
  );

  @Input()
  flightDetails:any

  @Input()
  persons:any

  passengers:any = []

  confirmBooking(){
    this.passengers = []
    if((this.persons ==1 && this.passengerDetailsForm1.valid) ||
    (this.persons ==2 && this.passengerDetailsForm1.valid && this.passengerDetailsForm2.valid) ||
    (this.persons ==3 && this.passengerDetailsForm1.valid && this.passengerDetailsForm2.valid && this.passengerDetailsForm3.valid) ||
    (this.persons ==4 && this.passengerDetailsForm1.valid && this.passengerDetailsForm2.valid && this.passengerDetailsForm3.valid && this.passengerDetailsForm4.valid) ||
    (this.persons ==5 && this.passengerDetailsForm1.valid && this.passengerDetailsForm2.valid && this.passengerDetailsForm3.valid && this.passengerDetailsForm4.valid && this.passengerDetailsForm5.valid)  
    )
    {
      let noOfPersons:number = Number(this.persons)

      switch(noOfPersons){
        case 1:{
          this.passengers.push(this.passengerDetailsForm1.value)
          break;
        }
        case 2:{
          this.passengers.push(this.passengerDetailsForm1.value)
          this.passengers.push(this.passengerDetailsForm2.value)
          break;
        }
        case 3:{
          this.passengers.push(this.passengerDetailsForm1.value)
          this.passengers.push(this.passengerDetailsForm2.value)
          this.passengers.push(this.passengerDetailsForm3.value)
          break;
        }
        case 4:{
          this.passengers.push(this.passengerDetailsForm1.value)
          this.passengers.push(this.passengerDetailsForm2.value)
          this.passengers.push(this.passengerDetailsForm3.value)
          this.passengers.push(this.passengerDetailsForm4.value)
          break;
        }
        case 5:{
          this.passengers.push(this.passengerDetailsForm1.value)
          this.passengers.push(this.passengerDetailsForm2.value)
          this.passengers.push(this.passengerDetailsForm3.value)
          this.passengers.push(this.passengerDetailsForm4.value)
          this.passengers.push(this.passengerDetailsForm5.value)
          break;
        }
      }

      this.flightService.saveBooking
      (JSON.stringify(this.passengers),
        this.flightDetails["flightNumber"],
        this.flightDetails["flightSchedule"])
        .subscribe(res =>{
          console.log(res)
          if(res.passengers){
            alert("Booking confirmed. Please note down your PNR Number: "+ res["pnr"])
          } else {
            alert("Already Booked. Please note down your PNR Number: "+ res["pnr"])
          }
          this.router.navigate(['checkbooking']);
      })
    }else{
      alert("Fill the form correctly!")
    }
  }

  ngOnInit(): void {
  }

}
