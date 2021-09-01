import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm= this.ff.group(
    {
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    }
  )
  invalidLogin = false

constructor(private router: Router,
private loginservice: AuthenticationService,private ff: FormBuilder) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.loginForm.value.username, this.loginForm.value.password)
    ) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

}
