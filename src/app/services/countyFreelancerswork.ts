import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, filter } from 'rxjs';
import { resetFakeAsyncZone } from '@angular/core/testing';


@Injectable({
  providedIn: 'root',
})
export class CountiesFreelancersWorkService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }


  addCounty(county: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/freelancerCountys/${county.freelancerId}`, county, { headers });
  }

  getFreelancersCounties(filter: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams({ fromObject: filter });
    return this.http.get<any>(`${this.apiUrl}/freelancerCountys/${filter.freelancerId}`, { headers, params });

  }

  updateFreelancerCounty(filter: any, newCounty: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/freelancerCountys/${filter.freelancerId}/${filter.CountyId}`, newCounty, { headers });

  }
  deleteFreelancerCounty(filter: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/freelancerCountys/${filter.freelancerId}/${filter.CountyId}`, { headers });
  };
}