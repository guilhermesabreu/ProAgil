import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseURL = 'http://localhost:5000/api/user/';

constructor(private http: HttpClient) { }
jwtHelper = new JwtHelperService(); 
decodedToken: any;

  login(model: any){
     return this.http.post(`${this.baseURL}login`, model)
     .pipe(map((response: any) => {
        const user = response;
        if(user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
     })
     );
  }

  register(model: any){
    return this.http.post(`${this.baseURL}login`, model);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
