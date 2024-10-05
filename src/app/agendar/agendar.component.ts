import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgendarDialogComponent } from './agendar-dialog/agendar-dialog.component';
import { ServiceTypesService } from '../services/service-types.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountyService } from '../services/county.service';
import { DistrictService } from '../services/district.service';
import { FreelancerService } from '../services/freelancer.service';
import { County } from '../models/county';
import { PageEvent } from '@angular/material/paginator';
import { jwtDecode } from 'jwt-decode';
import { SchedulingService } from '../services/scheduling.service';
import { Schedule } from '../models/schedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.scss'],
})
export class AgendarComponent implements OnInit {
  serviceTypes = [];
  districts = [];
  counties = [];
  freelancers = [];
  pickUpTimeOptions = [];
  totalResults: number = 0;
  currentPage: number = 1;
  editingIndex: number | null = null;
  listFreelancer = false;
  noFreelancers = false;
  selectedFreelancer: number | null = null;

  formGroup: FormGroup;
  formGroupResidential: FormGroup;
  formGroupCommercial: FormGroup;
  formGroupPosObra: FormGroup;

  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  constructor(
    private serviceTypesService: ServiceTypesService,
    private formBuilder: FormBuilder,
    private districtService: DistrictService,
    private countyService: CountyService,
    private freelancerService: FreelancerService,
    private schedulingService: SchedulingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createTimeOptions();
    this.createFormGroup();
    this.createFormGroupResidential();
    this.createFormGroupComercial();
    this.createFormGroupPosObra();
    this.listenDistrictChanges();
    this.getServiceTypes();
    this.getDistricts();
  }

  getFreelancers() {
    this.freelancerService
      .getFreelancers(this.currentPage, {
        serviceTypeId: this.formGroup.get('serviceType').value,
        countyId: this.formGroup.get('county').value,
        districtId: this.formGroup.get('district').value,
        date: this.formGroup.get('date').value?.toISOString().split('T')[0],
        startTime: this.formGroup.get('startTime').value,
        endTime: this.formGroup.get('endTime').value,
        address: this.formGroup.get('address').value,
        postalCode: this.formGroup.get('postalCode').value,
      })
      .subscribe({
        next: (result) => {
          console.log(result);
          if (result.xTotalCountHeader === '0') {
            this.noFreelancers = true;
            this.listFreelancer = false;
            this.isAlert = false;
            this.isError = false;
          } else {
            this.noFreelancers = false;
            this.listFreelancer = true;
            this.currentPage = 1;
            this.freelancers = result.response;
            console.log(this.freelancers);
            this.totalResults = parseInt(result.xTotalCountHeader);
            this.isAlert = false;
            this.isError = false;
          }
        },
        error: (error) => {
          window.scrollTo(0, 0);
          console.error('Erro ao listar freelancers:', error);
          if (error.status === 400) {
            this.alert1 = error.error.error;
            this.isSuccess = false;
            this.isAlert = true;
            this.isError = false;
          } else {
            this.isSuccess = false;
            this.isAlert = false;
            this.isError = true;
          }
        },
      });
  }

  selectFreelancer(freelancer: any, index: number) {
    console.log(freelancer);
    this.editingIndex = index;
    setTimeout(() => {
      this.selectedFreelancer = freelancer.id;
      this.listFreelancer = false;
      const scrollHeight = document.documentElement.scrollHeight;
      window.scrollTo(0, scrollHeight);
    }, 1000);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getFreelancers();
    window.scrollTo(0, 0);
    this.editingIndex = null;
    this.selectedFreelancer = null;
  }

  private createFormGroup() {
    this.formGroup = this.formBuilder.group({
      district: [undefined],
      county: [undefined],
      serviceType: [undefined],
      date: [undefined],
      startTime: [undefined],
      endTime: [undefined],
      address: [undefined],
      postalCode: [undefined],
    });
    this.formGroup
      .get('serviceType')
      .valueChanges.subscribe(() => this.onFieldChange());
    this.formGroup
      .get('district')
      .valueChanges.subscribe(() => this.onFieldChange());
    this.formGroup
      .get('county')
      .valueChanges.subscribe(() => this.onFieldChange());
    this.formGroup
      .get('date')
      .valueChanges.subscribe(() => this.onFieldChange());
    this.formGroup
      .get('startTime')
      .valueChanges.subscribe(() => this.onFieldChange());
    this.formGroup
      .get('endTime')
      .valueChanges.subscribe(() => this.onFieldChange());
    this.formGroup
      .get('address')
      .valueChanges.subscribe(() => this.onFieldChange());
    this.formGroup
      .get('postalCode')
      .valueChanges.subscribe(() => this.onFieldChange());
  }
  private createFormGroupResidential() {
    this.formGroupResidential = this.formBuilder.group({
      propertyTypeR: 'apartamento',
      sizeM2R: '40',
      bathroomQuantityR: '1',
      ironingServicesR: 'Não',
      petFriendlyR: ['Não'],
    });
    console.log(this.formGroupResidential.value);
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
    console.log(this.formGroupCommercial.value);
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
    console.log(this.formGroupPosObra.value);
  }

  onFieldChange() {
    this.listFreelancer = false;
  }

  private getServiceTypes() {
    this.serviceTypesService.getServiceTypes().subscribe((data) => {
      this.serviceTypes = data.map((district) => {
        return {
          value: district.id,
          viewValue: district.name,
        };
      });
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
      .get('district')
      .valueChanges.subscribe((districtId) => this.getCounties(districtId));
  }

  private createTimeOptions() {
    for (let hour = 0; hour < 24; hour++) {
      const minutes = ['00', '15', '30', '45'];
      minutes.forEach((minute) => {
        this.pickUpTimeOptions.push({
          value: `${hour <= 9 ? `0${hour}` : hour}:${minute}:00`,
          viewValue: `${hour <= 9 ? `0${hour}` : hour}:${minute}:00`,
        });
      });
    }
  }

  saveScheduling() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const clientId = decodedToken.clientId;
    const serviceType = this.formGroup.get('serviceType').value;

    const scheduling: Partial<Schedule> = {
      clientId: clientId,
      freelancerId: this.selectedFreelancer,
      dateScheduling: this.formGroup
        .get('date')
        .value?.toISOString()
        .split('T')[0],
      startTime: this.formGroup.get('startTime').value,
      endTime: this.formGroup.get('endTime').value,
      districtId: this.formGroup.get('district').value,
      countyId: this.formGroup.get('county').value,
      address: this.formGroup.get('address').value,
      postalCode: this.formGroup.get('postalCode').value,
      scheduleDetails: {},
    };

    if (serviceType === 1) {
      scheduling['typeServiceId'] = 1;
      scheduling['scheduleDetails'] = this.formGroupResidential.value;
    } else if (serviceType === 2) {
      scheduling['typeServiceId'] = 2;
      scheduling['scheduleDetails'] = this.formGroupCommercial.value;
    } else if (serviceType === 3) {
      scheduling['typeServiceId'] = 3;
      scheduling['scheduleDetails'] = this.formGroupPosObra.value;
    }
    console.log(scheduling);

    this.schedulingService.addScheduling(scheduling).subscribe({
      next: (response) => {
        this.isSuccess = true;
        this.isAlert = false;
        this.isError = false;
        this.router.navigate([`clientAgendamento/${response.id}`]);
      },
      error: (error) => {
        this.selectedFreelancer = null;
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
        }
      },
    });
  }
}
