import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataNewPassword, LoginData } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService {

  base_url = 'http://127.0.0.1:8000'

  headers : any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }) 
  }

  constructor(private http: HttpClient) { }

  login(data:LoginData){
    // const headers = new HttpHeaders();
    // headers.set(
    //   "Content-Type",
    //   "application/x-www-form-urlencoded;"
    // );
    return this.http.post(`${this.base_url}/login`,data, this.headers)
  }

  recovery(email:string){
    return this.http.get(`${this.base_url}/generate_token/${email}`)
  }

  save_password(data:DataNewPassword){
    return this.http.post(`${this.base_url}/update_user_password`,data)
  }
}
