import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceUser {

  constructor(private router: Router,private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn() && route.data.roles[0] === "USER"){
      let jwt:any = jwtDecode(sessionStorage.getItem("token") || '')
      let role = jwt["role"];
      if(role==="USER"){
        return true;
      } else {
        return false;
      }
    }

    this.router.navigate(['login']);
    return false;

  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceAdmin {

  constructor(private router: Router,private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn() && route.data.roles[0] === "ADMIN" ){
      let jwt:any = jwtDecode(sessionStorage.getItem("token") || '')
      let role = jwt["role"];
      if(role==="ADMIN"){
        return true;
      } else {
        return false;
      }
    }

    this.router.navigate(['login']);
    return false;

  }
}