import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { CheckInComponent } from './check-in/check-in.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightServiceService } from './flight-service.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SaveFlightComponent } from './save-flight/save-flight.component';
import { ScheduleFlightComponent } from './schedule-flight/schedule-flight.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightCardComponent,
    FlightDetailsComponent,
    PassengerDetailsComponent,
    CheckInComponent,
    BookingComponent,
    BookingDetailsComponent,
    NavigationBarComponent,
    FlightSearchComponent,
    LoginComponent,
    LogoutComponent,
    SaveFlightComponent,
    ScheduleFlightComponent,
    RegisterUserComponent,
    BookingHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FlightServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
