import { Component, OnInit } from '@angular/core';
import { FlightServiceService } from './flight-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
  }
}
