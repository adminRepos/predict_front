import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardHttpService {

  base_url = 'http://127.0.0.1:8000'

  headers : any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }) 
  }

  constructor(private http: HttpClient) { }

  token_validation(){
    let token:string = <string>localStorage.getItem('UD_Token')
    return this.http.get(`${this.base_url}/validToken/${token}`)
  }
}
