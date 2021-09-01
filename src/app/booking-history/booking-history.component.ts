import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {

  constructor() { }

  @Input()
  booking:any

  ngOnInit(): void {
  }

}
