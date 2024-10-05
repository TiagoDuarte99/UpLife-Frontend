import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private userDetailsSubject = new BehaviorSubject<any>(this.getUserDetailsFromLocalStorage());
  userDetails = this.userDetailsSubject.asObservable();

  // para enviar os dados do payload para outros components
  setUserDetails(userDetails: any) {
    this.userDetailsSubject.next(userDetails);
    this.saveUserDetailsToLocalStorage(userDetails);
  }

  saveUserDetailsToLocalStorage(userDetails: any) {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  getUserDetailsFromLocalStorage(): any {
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  }
}