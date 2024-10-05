import { Component } from '@angular/core';
import { RotasService } from '../services/rotas.service';
import { Router } from '@angular/router';
import { UserDetailsService } from '../services/userAngular.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userDetails: any;
  userDetailsSubject: any;
  constructor(public routeService: RotasService,
    private router: Router,
    private userDetailsService: UserDetailsService) { }

    ngOnInit(): void {
      this.userDetails = this.userDetailsService.getUserDetailsFromLocalStorage();
      
      this.userDetailsService.userDetails.subscribe((userDetails) => {
        this.userDetails = userDetails;
      });
    }

  homePage() {
    this.router.navigate(['']);
  }

  hpFreelancer(){
    this.router.navigate(['/freelancerHp']);
  }

  hpClient(){
    this.router.navigate(['/clientHp']);
  }

  signUp() {
    this.router.navigate(['/criarContaEscolha']);
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userDetails');
    this.userDetailsService.setUserDetails(null); // Notificar outros componentes sobre a alteração nos detalhes do usuário
    this.router.navigate(['/']);
  }

}
