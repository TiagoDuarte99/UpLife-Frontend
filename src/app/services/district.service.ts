import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../models/district';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getDistricts(): Observable<District[]> {

    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/districts`, { headers });
  }
  adminAddDistrict(district: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(district)
    return this.http.post<any>(`${this.apiUrl}/districts`, district, {
      headers,
    });
  }


  updateDistrict(districtId: any, district: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/districts/${districtId}`, district, {
      headers,
    });
  }

  deleteDistrict(districtId: any): Observable<any> {
    console.log(districtId)
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/districts/${districtId}`, { headers });
  }

}
