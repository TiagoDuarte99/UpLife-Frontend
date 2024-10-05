import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from '../models/schedule';
import { SchdulingsParams } from '../models/schedulings-params';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  addScheduling(schedule: Partial<Schedule>) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Schedule>(`${this.apiUrl}/schedulings`, schedule, {
      headers,
    });
  }

  getScheduling(id: number) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Schedule>(`${this.apiUrl}/schedulings/${id}`, {
      headers,
    });
  }

  getSchedulings(
    page: number,
    schdulingsParams: SchdulingsParams
  ): Observable<{ response: any; xTotalCountHeader: string }> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = this.buildSchedulingsParams(schdulingsParams);
    console.log(schdulingsParams)

    // Use observe: 'response' para obter a resposta HTTP completa
    return this.http
      .get<any>(`${this.apiUrl}/schedulings?page=${page}`, {
        headers,
        params,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const xTotalCountHeader = response.headers.get('X-Total-Count');
          return { response: response.body, xTotalCountHeader };
        })
      );
  }

  updateScheduling(filter: any, newScheduling: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const clientId = filter.clientId;
    const schedulingId = filter.schedulingId;
    console.log('service',newScheduling)

    return this.http.put<any>(`${this.apiUrl}/schedulings/${clientId}/${schedulingId}`, newScheduling, { headers});
  }

  
  deleteScheduling(scheduling: any): Observable<any>{
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('service',scheduling)

    let id: number;
    if (scheduling.clientId) {
    id = scheduling.clientId;
    } else if (scheduling.freelancerId) {
      id =scheduling.freelancerId;
    }
    const schedulingId = scheduling.schedulingId;

    
    return this.http.delete<any>(`${this.apiUrl}/schedulings/${id}/${schedulingId}`, { headers});
  }

private buildSchedulingsParams(schdulingsParams: SchdulingsParams): HttpParams {
  let params = new HttpParams();

  if (schdulingsParams.clientId) {
    params = params.set('clientId', schdulingsParams.clientId.toString());
  }

  if (schdulingsParams.freelancerId) {
    params = params.set('freelancerId', schdulingsParams.freelancerId.toString());
  }

  if (schdulingsParams.date) {
    params = params.set('date', schdulingsParams.date.toISOString().split('T')[0]);
  }

  return params;
}
}
