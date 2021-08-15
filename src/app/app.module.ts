import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightCardComponent,
    FlightDetailsComponent,
    PassengerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
