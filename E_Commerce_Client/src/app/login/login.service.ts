import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginServiceUrl = 'http://localhost:3001/auth';
  private otpServiceUtl = 'http://localhost:3001/otp';
  private querySserviceUrl = 'http://localhost:3001/query';

  isLoggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn = false;
  public token !: string;

  public uid: any;
  public action!: string;
  forgotPasswordValue = '';

  constructor(private http: HttpClient) { }

  verifyEmail(email:any) {
    return this.http.post(this.loginServiceUrl + '/verifyemail', {email})
  }

  login(data: any) {
    return this.http.post(this.loginServiceUrl + '/login', data);
  }

  register(data: any) {
    return this.http.post(this.loginServiceUrl + '/register', data);
  }

  generateOtp(data: any) {
    return this.http.post(this.otpServiceUtl + '/generateOtp', data)
  }

  verifyOtp(data: any) {
    if (this.action === 'forgotPassword') {
      data.password = this.forgotPasswordValue;
    }
    data.id = this.uid;
    return this.http.post(this.otpServiceUtl + '/verifyOtp', data);
  }

  forgotPassword(data: any) {
    return this.http.post(this.loginServiceUrl + '/forgotPassword', data);
  }

  getLoggedInStatus() {
    return this.isLoggedIn.asObservable();
  }

  sendQuery(value:any) {
    return this.http.post(this.querySserviceUrl , value)
  }

}
