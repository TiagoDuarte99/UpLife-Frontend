import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { RotasService } from '../services/rotas.service';
import { UserService } from '../services/user.service';
import { UserDetailsService } from '../services/userAngular.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  userType: string | null = null;
  hidePassword = true;

  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public routeService: RotasService,
    private userService: UserService,
    private userDetailsService: UserDetailsService,
  ) {
    // Login
    this.loginForm = this.formBuilder.group({
      email: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }

  onSubmit() {
    /* if (this.loginForm.valid) { */
      const formData = this.loginForm.value;
      this.loginService.login(formData).subscribe({
        next: (response) => {
          localStorage.setItem('jwtToken', response.token);
          console.log(response.payload);
          this.userDetailsService.setUserDetails(response.payload);
          if (response.payload.freelancerId !== undefined) {
            this.router.navigate(['/freelancerHp']);
          } else if (response.payload.clientId !== undefined) {
            this.router.navigate(['/clientHp']);
          } else if (response.payload.email === 'admin@uplife.pt') {
            this.router.navigate(['/admin']);
          } else {
            console.error('Tipo de utilizador desconhecido:');
          }
        },
        error: (error) => {
          console.error('Erro na autenticação:', error);
          if (error.status === 400) {
            this.alert1 = error.error.error;
            this.isSuccess = false;
            this.isAlert = true;
            this.isError = false;
          } else {
            this.isSuccess = false;
            this.isAlert = false;
            this.isError = true;
          };
        },
      });
    /* } */
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

}
