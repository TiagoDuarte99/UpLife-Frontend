import { Component } from '@angular/core';
import { UserDetailsService } from '../services/userAngular.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DistrictService } from '../services/district.service';
import { CountyService } from '../services/county.service';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-perfil-client',
  templateUrl: './perfil-client.component.html',
  styleUrls: ['./perfil-client.component.scss']
})
export class PerfilClientComponent {
  userDetails: any;
  clientDetails: any;
  districts = [];
  counties = [];
  formGroup: FormGroup;


  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  hidePassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;


  isEditing: boolean = false;
  isEditingUser: boolean = false;

  constructor(
    private clientService: ClientService,
    private userDetailsService: UserDetailsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private districtService: DistrictService,
    private countyService: CountyService,
    private serviceUser: UserService,) { }

  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;


  ngOnInit(): void {
    this.userDetailsService.userDetails.subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
    this.getclient();
    this.createFormGroup();
  }

  getclient() {
    const clientId = this.userDetails.clientId;
    this.clientService.getClientById(clientId).subscribe({
      next: (data) => {
        console.log('data',data)
        this.clientDetails = data;
      },
      error: (error) => {
        console.error('Erro ao buscar os detalhes do client:', error);
      }
    });
  }

  updateUser() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.id;

    const user = {
      newEmail: this.email,
      password: this.oldPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    }
    console.log(user)

    this.serviceUser.updateUser(userId, user).subscribe({
      next: (response) => {
        this.message1 = 'Alteração efectuada com sucesso';
        this.getclient();
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmNewPassword = null;
        this.email = null;
        this.isSuccess = true;
        this.isAlert = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Erro ao adicionar horário do freelancer:', error);
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
      }
    });
  }

  cancelEditing() {
    this.isEditing = false;
    this.isEditingUser = false;
    this.oldPassword = null;
    this.newPassword = null;
    this.confirmNewPassword = null;
    this.email = null;
    this.createFormGroup();
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }

  updateclient() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const clientId = decodedToken.clientId;

    const newclient = {
      clientId: clientId,
      firstName: this.formGroup.get('firstName').value,
      lastName: this.formGroup.get('lastName').value,
      districtId: this.formGroup.get('districtId').value,
      countyId: this.formGroup.get('countyId').value,
      address: this.formGroup.get('address').value,
      birthdate: this.formGroup.get('birthdate').value,
      phoneNumber: this.formGroup.get('phoneNumber').value,
      description: this.formGroup.get('description').value,
    };

    this.clientService.updateClientById(clientId, newclient).subscribe({
      next: (response) => {
        this.message1 = 'Alteração efectuada com sucesso';
        this.getclient();
        window.scrollTo(0, 0);
        this.isEditing = false;
        this.isSuccess = true;
        this.isAlert = false;
        this.isError = false;
      },
      error: (error) => {
        window.scrollTo(0, 0);
        console.error('Erro ao adicionar horário do client:', error);
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
      }
    });
  }

  startUpdate() {
    this.isEditing = true;
    this.isEditingUser = false;
    this.getDistricts();
    this.listenDistrictChanges();
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }

  startUpdateUser() {
    this.isEditingUser = true;
    this.isEditing = false;
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }

  private createFormGroup() {
    this.formGroup = this.formBuilder.group({
      firstName: [undefined],
      lastName: [undefined],
      description: [undefined],
      address: [undefined],
      birthdate: [undefined],
      phoneNumber: [undefined],
      districtId: [undefined],
      countyId: [undefined],
    });
  }

  private getCounties(districtId: number) {
    this.countyService.getCounties(districtId).subscribe(
      (data) =>
      (this.counties = data.map((county) => {
        return {
          value: county.id,
          viewValue: county.countyName,
        };
      }))
    );
  }

  private getDistricts() {
    this.districtService.getDistricts().subscribe((data) => {
      this.districts = data.map((district) => {
        return {
          value: district.id,
          viewValue: district.name,
        };
      });
    });
  }

  private listenDistrictChanges() {
    this.formGroup
      .get('districtId')
      .valueChanges.subscribe((districtId) => this.getCounties(districtId));
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
