import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm= this.ff.group(
    {
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      enabled:[true,],
      roles: [[{
        name: 'USER'
      }]],
      bookingDetails: [],
      mobile: ['',[Validators.required]],
      email: ['',[Validators.required]]
    }
  )

  constructor(private router: Router,private ff: FormBuilder, private flightService:FlightServiceService) { }

  register(){
    if(this.registerForm.valid){
      let user = JSON.stringify(this.registerForm.value);
      this.flightService.register(user).subscribe()
      alert("User registered successfully! ")
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
  }
}
