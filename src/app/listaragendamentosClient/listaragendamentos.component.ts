import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { SchedulingService } from '../services/scheduling.service';
import { ContentObserver } from '@angular/cdk/observers';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleFreelancerService } from '../services/scheduleFreelancer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listaragendamentos',
  templateUrl: './listaragendamentos.component.html',
  styleUrls: ['./listaragendamentos.component.scss']
})
export class ListaragendamentosComponent {
  totalResults: number = 0;
  currentPage: number = 1;
  schedulings = [];
  listSchedulings: boolean;
  noSchedulings: boolean;
  allSchedulings: boolean;
  date: Date | null = null;

  selectedMonth: number;
  selectedYear: number;
  selectedDay: number;
  schedules: any[];



  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  editingIndex: number;
  selectedScheduling: any;
  editingMode: boolean;
  clientEdit: boolean;

  formGroupResidential: FormGroup;
  formGroupCommercial: FormGroup;
  formGroupPosObra: FormGroup;


  constructor(
    private schedulingService: SchedulingService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.clientId) {
      this.clientEdit = true;
    }
    this.createFormGroupResidential()
    this.createFormGroupComercial()
    this.createFormGroupPosObra()
    this.getSchedulings()
  }

  onDateChange() {
    this.getSchedulings()
    this.currentPage = 1;
  }

  getSchedulings() {
    this.allSchedulings = true;
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    console.log('asdadsads', decodedToken)

    let filter: any = {};

    if (this.date !== null) {
      filter.date = this.date
    }

    if (decodedToken.clientId) {
      filter.clientId = decodedToken.clientId;
    }

    if (decodedToken.freelancerId) {
      filter.freelancerId = decodedToken.freelancerId;
    }

    this.schedulingService.getSchedulings(this.currentPage, filter).subscribe({
      next: (result) => {
        console.log(result);
        if (result.xTotalCountHeader === '0') {
          this.noSchedulings = true;
          this.listSchedulings = false;
          this.isAlert = false;
          this.isError = false;
        } else {
          this.noSchedulings = false;
          this.listSchedulings = true;
          this.schedulings = result.response;
          this.totalResults = parseInt(result.xTotalCountHeader);
          this.isAlert = false;
          this.isError = false;
        }
      }
    }
    );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getSchedulings();
    window.scrollTo(0, 0);
    this.editingIndex = null;
    this.selectedScheduling = null;
  }

  detailsScheduling(scheduling: any, index: number) {
    this.editingIndex = index;
    this.selectedScheduling = scheduling;
    this.allSchedulings = false;

  }

  editScheduling() {
    this.editingMode = true;
    this.allSchedulings = false;

  }

  backSchedulings() {
    this.editingIndex = null;
    this.selectedScheduling = null;
    this.allSchedulings = true;
  }

  cancelEdit() {
    this.editingMode = false;
    this.editingIndex = null;
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }


  updateScheduling() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const clientId = decodedToken.clientId;
    const schedulingId = this.selectedScheduling.id
    const serviceType = this.selectedScheduling.typeServiceId;

    const filter = {
      clientId, schedulingId
    }
    let newScheduling = { scheduleDetails: {} };

    if (serviceType === 1) {
      newScheduling.scheduleDetails = {
        propertyTypeR: this.formGroupResidential.get('propertyTypeR').value,
        sizeM2R: this.formGroupResidential.get('sizeM2R').value,
        bathroomQuantityR: this.formGroupResidential.get('bathroomQuantityR').value,
        ironingServicesR: this.formGroupResidential.get('ironingServicesR').value,
        petFriendlyR: this.formGroupResidential.get('petFriendlyR').value,
      };
    } else if (serviceType === 2) {
      newScheduling.scheduleDetails = {
        propertyTypeC: this.formGroupCommercial.get('propertyTypeC').value,
        sizeM2C: this.formGroupCommercial.get('sizeM2C').value,
        bathroomQuantityC: this.formGroupCommercial.get('bathroomQuantityC').value,
        changingRoomsC: this.formGroupCommercial.get('changingRoomsC').value,
        windowCleaningC: this.formGroupCommercial.get('windowCleaningC').value,
        otherScenariosC: this.formGroupCommercial.get('otherScenariosC').value,
      };
    } else if (serviceType === 3) {
      newScheduling.scheduleDetails = {
        propertyTypeP: this.formGroupPosObra.get('propertyTypeP').value,
        sizeM2P: this.formGroupPosObra.get('sizeM2P').value,
        bathroomQuantityP: this.formGroupPosObra.get('bathroomQuantityP').value,
        furnitureP: this.formGroupPosObra.get('furnitureP').value,
        windowCleaningP: this.formGroupPosObra.get('windowCleaningP').value,
        otherScenariosP: this.formGroupPosObra.get('otherScenariosP').value,
      };
    }
    console.log(newScheduling, 'componente')

    this.schedulingService.updateScheduling(filter, newScheduling).subscribe({
      next: (response) => {
        this.message1 = 'Agendamento editado com sucesso';
        this.selectedScheduling.scheduleDetails = response.scheduleDetails;
        this.editingMode = false;
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

  public exibirMensagem(): void {
    const snackBarRef = this.snackBar.open("Tem a ceteza que pretende eliminar o agendamento?", "Eliminar", {
      duration: 6000
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteScheduling();
    });
  }


  deleteScheduling() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    console.log('asdadsads', decodedToken)

    let filter: any;

    if (decodedToken.clientId) {
      filter = {
        clientId: decodedToken.clientId,
      };
    } else if (decodedToken.freelancerId) {
      filter = {
        freelancerId: decodedToken.freelancerId,
      };
    }
    const schedulingId = this.selectedScheduling.id;
    filter = { ...filter, schedulingId }
    console.log(filter);
    this.schedulingService.deleteScheduling(filter).subscribe({
      next: (response) => {
        this.message1 = 'Agendamento removido com sucesso';
        this.getSchedulings();
        window.scrollTo(0, 0);
        this.selectedScheduling = null;
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

  private createFormGroupResidential() {
    this.formGroupResidential = this.formBuilder.group({
      propertyTypeR: 'apartamento',
      sizeM2R: '40',
      bathroomQuantityR: '1',
      ironingServicesR: 'Não',
      petFriendlyR: ['Não'],
    });
  }

  private createFormGroupComercial() {
    this.formGroupCommercial = this.formBuilder.group({
      propertyTypeC: 'loja',
      sizeM2C: '60',
      bathroomQuantityC: '1',
      changingRoomsC: '0',
      windowCleaningC: 'Não',
      otherScenariosC: '',
    });
  }

  private createFormGroupPosObra() {
    this.formGroupPosObra = this.formBuilder.group({
      propertyTypeP: 'apartamento',
      sizeM2P: '60',
      bathroomQuantityP: '1',
      furnitureP: 'Não',
      windowCleaningP: 'Não',
      otherScenariosP: '',
    });
  }

  resetDate() {
    this.date = null;
    this.getSchedulings();
    this.editingIndex = null;
  }

}


