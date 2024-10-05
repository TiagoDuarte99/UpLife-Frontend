import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  users: any[];
  email: string;
  emailScearch: string;
  isActive: boolean;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  userSearch = {
    id: null,
    email: null,
    lastTimeLogin: null,
    active: false
  };
  noUserSearch: boolean = false;
  editing: boolean = false;

  hidePassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;


  editingIndex: number | null = null;
  editingMode: boolean = false;
  editingUser: {} = {};
  editingUserId: number;

  totalResults: number = 0;
  currentPage: number = 1;

  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  constructor(
    private serviceUser: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUsers();

  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getUsers()
    window.scrollTo(0, 0);
    this.editingIndex = null;
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
    //this.selectedScheduling = null;
  }

  searchUser(email: any) {
    if (email === undefined) {
      this.alert1 = 'insira um email'
      this.isAlert = true;
    } else {
      this.serviceUser.getUser(email).subscribe({
        next: (response) => {
          if (response === null) {
            console.log('asdsdasdasdassdaads')
          } else {
            console.log('Registro de freelancer bem-sucedido. Resposta do servidor:', response);
            this.message1 = 'Utilizador encontrado com sucesso';
            Object.assign(this.userSearch, response);
            this.noUserSearch = true;
            this.isSuccess = true;
            this.isAlert = false;
            this.isError = false;
          }
        },
        error: (error) => {
          console.error('Erro no registro de freelancer:', error);
          if (error.status === 400) {
            this.noUserSearch = false;
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
    }
  }

  editUserSearch(userSearch) {
    this.editing = true;
    this.editingMode = true;
    //this.selectedServiceType = null;
    this.editingUser = userSearch;
    this.editingUserId = userSearch.id;
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);

  }

  createUser() {
    const user = {
      email: this.email,
      password: this.newPassword,
      confirmPassword: this.confirmNewPassword
    }
    this.serviceUser.createUser(user).subscribe({
      next: (response) => {
        console.log('Registro de freelancer bem-sucedido. Resposta do servidor:', response);
        this.message1 = 'Utilizador registado com sucesso';
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
  }

  private getUsers() {
    const filter = {}
    this.serviceUser.getUsers(this.currentPage, filter).subscribe({
      next: (response) => {
        console.log(response)
        this.totalResults = parseInt(response.xTotalCountHeader);
        this.users = response.response;
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

  editUser(user: any, index: number) {
    console.log(user)
    this.editingMode = true;
    //this.selectedServiceType = null;
    this.editingUser = user;
    this.editingIndex = index;
    this.editingUserId = user.id;
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  }

  cancelEdit() {
    this.editingMode = false;
    this.editingUser = null;
    this.editingIndex = null;
    this.oldPassword = null;
    this.newPassword = null;
    this.confirmNewPassword = null;
    this.email = null;
    this.isActive = null,
      this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }

  updateUser() {
    const userId = this.editingUserId;
    const user = {
      newEmail: this.email,
      active: this.isActive,
      password: this.oldPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    }
    console.log(user)

    this.serviceUser.updateUser(userId, user).subscribe({
      next: (response) => {
        this.message1 = 'Utilizador editado com sucesso';
        this.getUsers()

        if (this.noUserSearch === true) {
          if (user.newEmail !== null) {
            this.emailScearch = user.newEmail
            this.searchUser(user.newEmail)
          }else{
          this.searchUser(this.emailScearch)
          }
          
        }
        this.editing = false;
        this.editingMode = false;
        this.editingUserId = null;
        this.editingIndex = null;
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmNewPassword = null;
        this.email = null;
        this.isActive = null,
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

  public exibirMensagem(user): void {
    const snackBarRef = this.snackBar.open("Tem a ceteza que pretende eliminar o utilizador?", "Eliminar", {
      duration: 6000
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteUser(user)
    });
  }


  deleteUser(user: any) {
    const userId = user.id

    this.serviceUser.deleteUser(userId).subscribe({
      next: (response) => {
        this.message1 = 'Utilizador removido com sucesso';
        this.getUsers()
        this.noUserSearch = false;
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
