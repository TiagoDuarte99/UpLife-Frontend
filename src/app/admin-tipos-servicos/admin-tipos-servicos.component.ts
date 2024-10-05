import { Component } from '@angular/core';
import { ServiceTypesService } from '../services/service-types.service';
import { jwtDecode } from 'jwt-decode';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-tipos-servicos',
  templateUrl: './admin-tipos-servicos.component.html',
  styleUrls: ['./admin-tipos-servicos.component.scss']
})
export class AdminTiposServicosComponent {
  services: any[];
  serviceName: string;


  editingIndex: number | null = null;
  editingMode: boolean = false;
  editingService: {} = {};
  editingServiceId: number;


  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  constructor(
    private serviceTypesService: ServiceTypesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getServiceTypes();

  }

  addFreelancerService() {
    console.log(this.serviceName)
    const service = {
      name: this.serviceName
    }

    this.serviceTypesService.addService(service).subscribe({
      next: (response) => {
        this.message1 = 'Serviço adicionado com sucesso';
        this.getServiceTypes();
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
    }
    );
  }

  private getServiceTypes() {
    this.serviceTypesService.getServiceTypes().subscribe({
      next: (response) => {
        this.services = response;
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

  editService(service: any, index: number) {
    this.editingMode = true;
    this.editingService = service;
    this.editingIndex = index;
    this.editingServiceId = service.id;
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  }

  cancelEdit() {
    this.editingMode = false;
    this.editingService = null;
    this.editingIndex = null;
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }


  updateService() {
    const serviceId = this.editingServiceId;
    const service = {
      id: serviceId,
      name: this.serviceName
    }

    this.serviceTypesService.updateService(serviceId, service).subscribe({
      next: (response) => {
        this.message1 = 'Serviço alterado com sucesso';
        this.getServiceTypes();
        this.serviceName = null;
        this.editingMode = false;
        this.editingService = null;
        this.editingIndex = null;
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

  public exibirMensagem(service: any): void {
    const snackBarRef = this.snackBar.open("Tem a ceteza que pretende eliminar o serviço?", "Eliminar", {
      duration: 6000
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteService(service);
    });
  }

  deleteService(service: any) {
    const serviceId = service.id

    this.serviceTypesService.deleteService(serviceId).subscribe({
      next: (response) => {
        this.message1 = 'Serviço removido com sucesso';
        this.getServiceTypes()
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

}
