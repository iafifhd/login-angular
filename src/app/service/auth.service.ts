import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";

// import { AppComponent } from './../app.component';

@Injectable()
export class AuthService {

  constructor(private http:Http) { }
  
  apiURlauth = 'http://localhost:3000/auth';
  authToken;
  user;
  option;
  
  
  registerUser(user){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiURlauth+'/register',JSON.stringify(user),options)
      .map((res:Response) =>res.json());
  }

  cekUsername(user){
    return this.http.get(this.apiURlauth+'/cekusername/'+user)
      .map(res=>res.json());
  }
  cekEmail(email){
    return this.http.get(this.apiURlauth+'/cekemail/'+email)
      .map(res=>res.json());
  }

  login(user){
    return this.http.post(this.apiURlauth+'/login',user).map(res=>res.json());
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();

  }

  // cek token masih valid
  isLogin(){return tokenNotExpired()}

  getProfile(){
    this.authHeaders();
    return this.http.get(this.apiURlauth+'/profile',this.authHeaders()).map(res => res.json());
  }

  loadToken(){this.authToken = localStorage.getItem('token');}
  
  

  authHeaders(){
    this.loadToken() ;
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'auth': this.authToken // Attach token
      })
    })
  }

  simpanUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getAlluser() {
    return this.http.get(this.apiURlauth + '/alluser')
      .map(res => res.json());
  }

  delUser(userId){
    return this.http.delete(this.apiURlauth +'/deleteuser/'+userId)
      .map(res=>res.json());
  }


}
