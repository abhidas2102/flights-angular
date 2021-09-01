import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { FlightServiceService } from '../flight-service.service';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  constructor(private flightService:FlightServiceService,private router:Router) { }

  @Input()
  showBookingDetails:any

  @Input()
  passenger:any

  downloadingPDF:boolean=false;

  ngOnInit(): void {
  }
}
