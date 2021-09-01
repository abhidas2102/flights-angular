import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { FlightServiceService } from '../flight-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  constructor(private ff: FormBuilder, private flightService:FlightServiceService, private router:Router) { }

  searchByPNR = this.ff.group(
    {
      pnr:[]
    }
  );

  showBookingDetails:any
  passengerDetails:any = []
  bookings:any=[]

  bookingFound:boolean=false
  bookingDetailsNotFound:boolean=false

  searchBooking(){
    this.flightService.bookingHistory()
    if(this.searchByPNR.valid){
      this.flightService.showBookingDetails(this.searchByPNR).subscribe(res =>{
        this.showBookingDetails=res
        this.passengerDetails = this.showBookingDetails.passengers
        this.bookingFound=true;
      })
        
    }
  }

  bookingHistory(){
    this.flightService.bookingHistory().subscribe(res=>{
      this.bookings=res
    })
  }

  public downloadAsPDF() {
    for(var passenger of this.passengerDetails){
      var data = document.getElementById(passenger.id) as HTMLImageElement
      html2canvas(data).then(canvas => {

        var imgWidth = 190;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth / canvas.width);
        var heightLeft = imgHeight;
        
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 10;
        pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight)
        pdf.save(this.showBookingDetails["pnr"]+'_'+passenger.firstName+'_'+passenger.lastName+'.pdf'); // Generated PDF
      });
    }
  }

  cancelBooking(){
    this.flightService.cancelBooking(this.showBookingDetails).subscribe()
    alert("Booking CANCELLED! You will get the refund within 14 working days")
    this.router.navigate(['search']);
  }

  datePast(){
    if(this.showBookingDetails){
      let date = new Date(this.showBookingDetails["pnr"].slice(-8,-4)+"-"+this.showBookingDetails["pnr"].slice(-4,-2)+"-"+this.showBookingDetails["pnr"].slice(-2));
      let today = new Date(formatDate(new Date(),'yyyy-MM-dd','en-US'))

      if(date.getTime() < today.getTime()){
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  ngOnInit(): void {
    this.bookingHistory()
  }

}
