import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken:any;
  user:any;

  constructor(private http:Http) {}

  registerUser(user){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');

    /***
     * Observable here
     */
    return this.http.post('http://localhost:3000/users/register', user, {headers:headers})
    .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('content-Type', 'application/json');

    /***
     * Observable here
     */
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers:headers})
    .map(res => res.json());
  }
  // store user data to local storage
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();

  }

}
