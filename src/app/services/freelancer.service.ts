import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FreelancersParams } from '../models/freelancers-params';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getFreelancers(
    page: number,
    freelancersParams: FreelancersParams
  ): Observable<{ response: any; xTotalCountHeader: string }> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = this.buildFreelancersParams(freelancersParams);

    // Use observe: 'response' para obter a resposta HTTP completa
    return this.http
      .get<any>(`${this.apiUrl}/freelancers?page=${page}`, {
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

  getFreelancerById(freelancerId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/freelancers/${freelancerId}`, {
      headers,
    });
  }

  updateFreelancerById(freelancerId: number, freelancer: any) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
console.log('update freel')
    return this.http.put<any>(`${this.apiUrl}/freelancers/${freelancerId}`, freelancer, {
      headers,
    });
  }



  private buildFreelancersParams(
    freelancersParams: FreelancersParams
  ): HttpParams {
    let params = new HttpParams();
    if (freelancersParams.serviceTypeId) {
      params = params.set('serviceTypeId', freelancersParams.serviceTypeId);
    }
    if (freelancersParams.districtId) {
      params = params.set('districtId', freelancersParams.districtId);
    }
    if (freelancersParams.countyId) {
      params = params.set('countyId', freelancersParams.countyId);
    }
    if (freelancersParams.date) {
      params = params.set('date', freelancersParams.date);
    }
    if (freelancersParams.startTime) {
      params = params.set('startTime', freelancersParams.startTime);
    }
    if (freelancersParams.endTime) {
      params = params.set('endTime', freelancersParams.endTime);
    }
    if (freelancersParams.address) {
      params = params.set('address', freelancersParams.address);
    }
    if (freelancersParams.postalCode) {
      params = params.set('postalCode', freelancersParams.postalCode);
    }
    return params;
  }
}
