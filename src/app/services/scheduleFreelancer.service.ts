import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleFreelancerService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  addFreelancerSchedule(scheduleData: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
    return this.http.post<any>(`${this.apiUrl}/freelancersSchedules/${scheduleData.freelancerId}`, scheduleData, { headers });
  }

  getFreeSchedules(filter: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams({ fromObject: filter });

    return this.http.get<any>(`${this.apiUrl}/freelancersSchedules/${filter.freelancerId}`, { headers, params });
  }
 
  updateFreelancerSchedule(filter: any, schedule: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/freelancersSchedules/${filter.freelancerId}/${filter.scheduleId}`, schedule, { headers});

  }

  deleteFreelancerSchedule(filter: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/freelancersSchedules/${filter.freelancerId}/${filter.scheduleId}`, { headers});
  }

}