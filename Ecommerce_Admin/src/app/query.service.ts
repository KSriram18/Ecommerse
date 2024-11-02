import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class QueryService {

  constructor(private http:HttpClient) { }
  serviceUrl = "http://localhost:3001/query";
  userUrl = "http://localhost:3001/auth";
  snackbar = inject(MatSnackBar);

  getQueries() {
    return this.http.get(this.serviceUrl)
  }

  resolveQuery(id:any,value:string,email:string) {
    return this.http.post(this.serviceUrl+'/resolve', {id,value,email})
  }

  getUsers() {
    return this.http.get(this.userUrl+'/users');
  }

  toggleUser(email:string, isUserConfirmed:boolean) {
    return this.http.post(this.userUrl+'/users', {email,isUserConfirmed});
  }

  snackBar(message:string, action:string='Dismiss') {
    this.snackbar.open(message,action,{duration:2000})
  }

}
