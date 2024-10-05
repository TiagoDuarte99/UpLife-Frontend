import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypesService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  addService(service: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(service)
    return this.http.post<any>(`${this.apiUrl}/serviceTypes`, service, {
      headers,
    });
  }

  getServiceTypes(): Observable<any[]> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/serviceTypes`, {
      headers,
    });
  }

  updateService(serviceId: any, service: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/serviceTypes/${serviceId}`, service, { headers});

  }

  deleteService(serviceId: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/serviceTypes/${serviceId}`, { headers});
  }
}
