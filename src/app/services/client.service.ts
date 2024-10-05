import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

/*   getClients( page: number, filter: any): Observable<{ response: any; xTotalCountHeader: string }> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<any>(`${this.apiUrl}/clients?page=${page}`, {
        headers,
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const xTotalCountHeader = response.headers.get('X-Total-Count');
          return { response: response.body, xTotalCountHeader };
        })
      );
  } */

  getClientById(clientId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
console.log('service')
    return this.http.get<any>(`${this.apiUrl}/clients/${clientId}`, {
      headers,
    });
  }

  updateClientById(freelancerId: number, freelancer: any) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
console.log('update freel')
    return this.http.put<any>(`${this.apiUrl}/clients/${freelancerId}`, freelancer, {
      headers,
    });
  }

}
