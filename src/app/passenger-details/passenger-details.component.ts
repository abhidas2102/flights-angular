import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent implements OnInit {

  constructor(private ff: FormBuilder) { }

  passengerDetailsForm = this.ff.group(
    {
      firstName: ['John'],
      lastName: ['Doe'],
      email: ['johndoe@abc.com'],
      mobile: [],
      gender:['male']
    }
  );

  ngOnInit(): void {
  }

}
