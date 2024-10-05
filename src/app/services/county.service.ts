import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from '../models/district';
import { County } from '../models/county';

@Injectable({
  providedIn: 'root',
})
export class CountyService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getCounties(districtId: number): Observable<County[]> {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(
      `${this.apiUrl}/countys?districtId=${districtId}`, { headers }
    );
  }

  adminAddCounty(county: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/countys?districtId`, county, { headers });
  }

  adminUpdateCounty(countyId: any, county: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/countys/${countyId}/`, county, { headers });

  }



  adminDeletCounty(countyid: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/countys/${countyid}`, { headers });
  }
}
