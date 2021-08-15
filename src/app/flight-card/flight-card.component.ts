import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {

  @Input()
  flight:any;

  @Output()
  continueBookingTrigger:EventEmitter<string> = new EventEmitter<string>();

  continueBooking(){
    this.continueBookingTrigger.emit();
    console.log("continuebooking")
  }

  constructor() { }

  ngOnInit(): void {
  }

}
