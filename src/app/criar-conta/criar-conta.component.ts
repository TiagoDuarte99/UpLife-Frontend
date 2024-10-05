import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '../services/registo.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss']
})
export class CriarContaComponent {
  hidePassword = true;
  hideConfirmPassword = true;

  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private registroService: RegistroService) {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      birthdate: '',
      email: '',
      password: '',
      confirmPassword: '',
      tipoConta: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const tipoConta = params['tipoConta'];
      console.log('Tipo de Conta:', tipoConta);
      this.registerForm.controls['tipoConta'].setValue(tipoConta);
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        birthdate: this.registerForm.value.birthdate,
      };

      if (this.registerForm.value.tipoConta === 'freelancer') {
        this.registroService.createFreelancerAccount(formData).subscribe({
          next: (response) => {
            console.log('Registro de freelancer bem-sucedido. Resposta do servidor:', response);
            this.message1 = 'User signup successfully';
            this.isSuccess = true;
            this.isAlert = false;
            this.isError = false;
          },
          error: (error) => {
            console.error('Erro no registro de freelancer:', error);
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
      } else if (this.registerForm.value.tipoConta === 'client') {
        this.registroService.createClientAccount(formData).subscribe({
          next: (response) => {
            this.message1 = 'Utilizador registado com sucesso';
            this.isSuccess = true;
            this.isAlert = false;
            this.isError = false;
          },
          error: (error) => {
            console.error('Erro no registro de cliente:', error);
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
      } else {
        console.error('Tipo de conta desconhecido:', this.registerForm.value.tipoConta);
      }
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}