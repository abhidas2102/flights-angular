import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private loginservice: AuthenticationService) { }

  role:string='';
  userName:string=''

  ngOnInit(): void {
    
  }

  showAdmin(){
    let token = sessionStorage.getItem("token") || '';
    let jwt:any
    if(token){
      jwt = jwtDecode(token)
    }
    if(jwt){
      this.role = jwt["role"];
    }
    if(this.role==="ADMIN"){
      return true;
    } else {
      return false;
    }
  }

  loggedIn(){
    this.userName=this.getUserName()
    return this.loginservice.isUserLoggedIn()
  }

  getUserName(){
    return sessionStorage.getItem("username") || ''
  }

}
