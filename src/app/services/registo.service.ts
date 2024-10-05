import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3001'; 

  constructor(private http: HttpClient) {}
  /*
  registrar(utilizador: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, utilizador);
  }*/
  
  createFreelancerAccount(freelancer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup/freelancers`, freelancer);
  }

  createClientAccount(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup/clients`, client);
  }
  
}