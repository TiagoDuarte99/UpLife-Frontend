import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedUser: User;

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getUser(email: any): Observable<User> {
    const token = localStorage.getItem('jwtToken');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users/email/${email}`, {
      headers,
    });
  }

  getUsers(page: number, filter: any): Observable<{ response: any; xTotalCountHeader: string }> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<any>(`${this.apiUrl}/users?page=${page}`, { 
      headers,
      observe: 'response',
    }).pipe(
      map((response: HttpResponse<any>) => {
        return {
          response: response.body,
          xTotalCountHeader: response.headers.get('x-total-count') || '0',
        };
      })
    );
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup/users`, user);
  }

  updateUser(userId: any, user: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, user, { headers});

  }

  deleteUser(userId: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`, { headers});
  }



}
