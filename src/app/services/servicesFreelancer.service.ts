import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesFreelancerService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  addService(service: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 
    return this.http.post<any>(`${this.apiUrl}/freelancerServices/${service.freelancerId}`, service, { headers });
  }

  getFreeServices(filter: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams({ fromObject: filter });

    return this.http.get<any>(`${this.apiUrl}/freelancerServices/${filter.freelancerId}`, { headers, params });
  }
 
  updateFreelancerService(filter: any, service: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}/freelancerServices/${filter.freelancerId}/${filter.serviceId}`, service, { headers});

  }

  deleteFreelancerSchedule(filter: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<any>(`${this.apiUrl}/freelancerServices/${filter.freelancerId}/${filter.serviceId}`, { headers});
  }

}