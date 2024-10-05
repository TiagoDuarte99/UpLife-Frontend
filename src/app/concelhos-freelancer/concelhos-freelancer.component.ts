import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceTypesService } from '../services/service-types.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountyService } from '../services/county.service';
import { DistrictService } from '../services/district.service';
import { FreelancerService } from '../services/freelancer.service';
import { County } from '../models/county';
import { jwtDecode } from 'jwt-decode';
import { CountiesFreelancersWorkService } from '../services/countyFreelancerswork';

@Component({
  selector: 'app-concelhos-freelancer',
  templateUrl: './concelhos-freelancer.component.html',
  styleUrls: ['./concelhos-freelancer.component.scss']
})
export class ConcelhosFreelancerComponent implements OnInit {
  formGroup: FormGroup;
  districts = [];
  countys: any[];
  freelancers = [];
  FreeCountys: any[];
  totalResults: number = 0;
  currentPage: number = 1;
  selectdistrict: number;
  selectcounty: number;


  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;


  editingMode: boolean = false;
  editingIndex: number | null = null;
  editingCounty: {} = {};
  editingCountyId: number;
  constructor(

    private formBuilder: FormBuilder,
    private districtService: DistrictService,
    private countyService: CountyService,
    private freelancerService: FreelancerService,
    private CountiesFreelancersWorkService: CountiesFreelancersWorkService,

  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.listenDistrictChanges();
    this.getDistricts();
    this.getFreelancerCounties()
  }

  getFreelancers() {
    this.freelancerService
      .getFreelancers(this.currentPage, {
        countyId: this.formGroup.get('county').value,
        districtId: this.formGroup.get('district').value,

      })
      .subscribe((result) => {
        this.freelancers = result.response;
        this.totalResults = parseInt(result.xTotalCountHeader);
      });
  }


  private createFormGroup() {
    this.formGroup = this.formBuilder.group({
      district: [undefined],
      county: [undefined],
    });
  }

  private getCounties(districtId: number) {
    this.countyService.getCounties(districtId).subscribe(
      (data) =>
      (this.countys = data.map((county) => {

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

  addFreelancerCounty() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const county = {
      freelancerId: freelancerId,
      districtId: this.selectdistrict,
      countyId: this.selectcounty,
    }
    this.CountiesFreelancersWorkService.addCounty(county).subscribe({
      next: (response) => {
        this.getDistricts()
        this.getFreelancerCounties()
        this.message1 = "Concelho adicionado com sucesso"
        this.isSuccess = true;
        this.isAlert = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Erro ao adicionar concelho ao freelancer:', error);
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
      }
    })
  }

  getFreelancerCounties() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const filter = {
      freelancerId: freelancerId,
    }
    this.CountiesFreelancersWorkService.getFreelancersCounties(filter).subscribe({
      next: (response) => {
        console.log(response)
        this.FreeCountys = response
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


    })
  }

  editCounty(county: any, index: number) {
    console.log(county)
    this.editingMode = true;
    this.selectdistrict = county.districtId;
    this.selectcounty = county.countyId;
    this.editingIndex = index;
    this.editingCountyId = county.countyId;
  }


  updateFreelancercounty() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const CountyId = this.editingCountyId;
    console.log(CountyId)
    const filter = {
      freelancerId, CountyId
    }
    const newCounty = {
      freelancerId: freelancerId,
      districtId: this.selectdistrict,
      countyId: this.selectcounty,
    }
    this.CountiesFreelancersWorkService.updateFreelancerCounty(filter, newCounty).subscribe({
      next: (response) => {
        this.getFreelancerCounties();
        this.message1 = "Concelho editado com sucesso"
        this.selectdistrict = null;
        this.selectcounty = null;
        this.editingMode = false;

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

  deleteCounty(county: any) {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwtDecode(token);
    const freelancerId = decodedToken.freelancerId;
    const CountyId = county.countyId
    const filter = {
      freelancerId, CountyId
    }
    console.log(filter)
    this.CountiesFreelancersWorkService.deleteFreelancerCounty(filter).subscribe({
      next: (response) => {
        this.getFreelancerCounties();
        this.message1 = "Concelho removido com sucesso"
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

