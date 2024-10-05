import { Component } from '@angular/core';
import { ServiceTypesService } from '../services/service-types.service';
import { jwtDecode } from 'jwt-decode';
import { ServicesFreelancerService } from '../services/servicesFreelancer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-services-freelancer',
  templateUrl: './services-freelancer.component.html',
  styleUrls: ['./services-freelancer.component.scss']
})
export class ServicesFreelancerComponent {
  serviceTypes = [];
  selectedServiceType: number;
  selectedPrice: number;
  services: any[];


  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  editingMode: boolean = false;
  editingIndex: number | null = null;
  editingService: {} = {};
  editingServiceId: number;

  constructor(
    private servicesFreelancerService: ServicesFreelancerService,
    private serviceTypesService: ServiceTypesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getServiceTypes();
    this.getFreelancerServices();

  }


  private getServiceTypes() {
    this.serviceTypesService.getServiceTypes().subscribe((data) => {
      this.serviceTypes = data.map((service) => {
        return {
          value: service.id,
          viewValue: service.name,
        };
      });
    });
  }


  addFreelancerService() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const service = {
      freelancerId: freelancerId,
      serviceTypeId: this.selectedServiceType,
      pricePerHour: this.selectedPrice
    }

    this.servicesFreelancerService.addService(service).subscribe({
      next: (response) => {
        this.message1 = 'Serviço adicionado com sucesso';
        this.getFreelancerServices();
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

  getFreelancerServices() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const filter = {
      freelancerId: freelancerId,
    };

    this.servicesFreelancerService.getFreeServices(filter).subscribe({
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
    }
    );
  }

  editService(service: any, index: number) {
    console.log(service)
    this.editingMode = true;
    this.selectedPrice = null;
    this.selectedServiceType = null;
    this.editingService = service;
    this.editingIndex = index;
    this.editingServiceId = service.serviceId;
    this.selectedPrice = service.pricePerHour;
  }

  cancelEdit() {
    this.editingMode = false;
    this.editingService = null;
    this.editingIndex = null;
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }

  updateFreelancerSchedule() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const serviceId = this.editingServiceId
    const filter = {
      freelancerId, serviceId
    }
    const newService = {
      freelancerId: freelancerId,
      serviceTypeId: this.selectedServiceType,
      pricePerHour: this.selectedPrice
    }
    this.servicesFreelancerService.updateFreelancerService(filter, newService).subscribe({
      next: (response) => {
        this.message1 = 'Serviço editado com sucesso';
        this.getFreelancerServices();
        this.selectedPrice = null;
        this.selectedServiceType = null;
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

  public exibirMensagem(service): void {
    const snackBarRef = this.snackBar.open("Tem a ceteza que pretende eliminar o serviço?", "Eliminar", {
      duration: 6000
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteService(service);
    });
  }

  deleteService(service: any) {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const serviceId = service.serviceId
    const filter = {
      freelancerId, serviceId
    }
    this.servicesFreelancerService.deleteFreelancerSchedule(filter).subscribe({
      next: (response) => {
        this.message1 = 'Serviço removido com sucesso';
        this.getFreelancerServices();
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
