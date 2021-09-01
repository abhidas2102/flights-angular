import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FlightServiceService {

  constructor(private http: HttpClient) { }

  flightsUrl='http://localhost:8765/flights-service/flights'
  bookingUrl='http://localhost:8765/booking-service/booking'
  baseUrl='http://localhost:8765'

  searchFlightByFlightNumber(searchQuery:any): Observable<any>{
    //let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      //'Authorization': 'Bearer '+token
    });
    return this.http.post(this.flightsUrl+'/searchFlightByFlightNumber',searchQuery,{headers})
  }

  searchFlightByPersons(searchQuery:any): Observable<any>{
    //let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      //'Authorization': 'Bearer '+token
    });
    return this.http.post(this.flightsUrl+'/searchFlightByPersons',searchQuery,{headers})
  }

  saveBooking(passengers:any, flightNumber:string, flightSchedule:any): Observable<any>{
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization': 'Bearer '+token
    });
    let date = flightSchedule[0];
    let clearDate= date["scheduleDate"].substring(0,10)

    let username = sessionStorage.getItem("username")
    
    return this.http.post(this.bookingUrl+'/saveBooking/'+flightNumber+'/'+clearDate+'/'+username,passengers,{headers})
  }

  showBookingDetails(searchByPNR:any): Observable<any>{
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization': 'Bearer '+token
    });
    return this.http.get(this.bookingUrl+'/getBookingDetails/'+searchByPNR.get('pnr').value,{headers})
  }

  cancelBooking(deleteQuery:any): Observable<any>{
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization': 'Bearer '+token
    });
    let username = sessionStorage.getItem("username")
    return this.http.get(this.bookingUrl+'/cancelBooking/'+deleteQuery['pnr']+"/"+username,{headers})
  }

  doCheckIn(searchByPNR:any): Observable<any>{
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization': 'Bearer '+token
    });
    return this.http.get(this.bookingUrl+'/doCheckIn/'+searchByPNR.get('pnr').value,{headers})
  }

  saveFlight(flightData:any){
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization': 'Bearer '+token
    });
    return this.http.post(this.flightsUrl+'/admin/saveFlight',flightData,{headers})
  }

  scheduleFlight(schedule:any, flightNumber:any){
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization': 'Bearer '+token
    });
    return this.http.post(this.flightsUrl+'/admin/scheduleFlight/'+flightNumber,schedule,{headers})
  }

  bookingHistory():Observable<any>{
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization': 'Bearer '+token
    });
    let username = sessionStorage.getItem("username")
    return this.http.get(this.bookingUrl+'/bookingHistory/'+username,{headers});
  }

  login(username:any,password:any):Observable<any>{
    let login={
      "username": username,
      "password": password
    }

    return this.http.post(this.baseUrl+'/authenticate',login);
  }

  register(user:any):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8'
    });
    return this.http.post(this.baseUrl+'/registerUser',user,{headers})
  }
}