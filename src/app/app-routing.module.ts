import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardServiceUser } from './auth-guard.service';
import { AuthGuardServiceAdmin } from './auth-guard.service';
import { BookingComponent } from './booking/booking.component';
import { CheckInComponent } from './check-in/check-in.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { SaveFlightComponent } from './save-flight/save-flight.component';
import { ScheduleFlightComponent } from './schedule-flight/schedule-flight.component';

const routes: Routes = [
  //{path:'', component: FlightSearchComponent},
  {path:'search', component: FlightSearchComponent},
  {path: 'checkbooking', component: BookingComponent,canActivate:[AuthGuardServiceUser],data: { roles: ["USER"] }},
  {path: 'checkin', component: CheckInComponent,canActivate:[AuthGuardServiceUser],data: { roles: ["USER"] }},
  { path: '', component: FlightSearchComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'saveFlight', component: SaveFlightComponent,canActivate:[AuthGuardServiceAdmin],data: { roles: ["ADMIN"] }},
  { path: 'scheduleFlight', component: ScheduleFlightComponent,canActivate:[AuthGuardServiceAdmin], data: { roles: ["ADMIN"] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
