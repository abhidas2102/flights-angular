import { Injectable } from '@angular/core';
import { FlightServiceService } from './flight-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private flightService:FlightServiceService) { }

  authenticate(username:any, password:any) {
    if (username!==null && password!==null) {
      this.flightService.login(username,password).subscribe(res =>{
          sessionStorage.setItem('token',res.token)
          sessionStorage.setItem('username', username)
      })
      return true
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
