import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountyService } from '../services/county.service';
import { DistrictService } from '../services/district.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-concelhos',
  templateUrl: './admin-concelhos.component.html',
  styleUrls: ['./admin-concelhos.component.scss']
})
export class AdminConcelhosComponent {
  formGroup: FormGroup;
  districts: any[];
  countys: any[];
  districtName: string;
  countyName: string = '';
  editCountyName: string = '';
  districtName1: number;



  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  editingIndex: number | null = null;
  editingMode1: boolean = false;
  editingdistrict: {} = {};
  editingdistrictId: number;
  editingCountyId: number;

  constructor(

    private formBuilder: FormBuilder,
    private districtService: DistrictService,
    private countyService: CountyService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.listenDistrictChanges();
    this.getDistricts();
    this.districtName1 = 1;

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
  adminAddCounty() {
    console.log(this.countyName)

    const county = {
      districtId: this.districtName1,
      name: this.countyName
    }
    this.countyService.adminAddCounty(county).subscribe({
      next: (response) => {
        this.getCounties(this.districtName1);
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
  editCounty(county: any, index: number) {
    console.log(county)
    this.editingMode1 = true;
    this.districtName1 = this.districtName1;
    this.editingIndex = index;
    this.editCountyName = county.value;
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  }

  cancelEditCounty() {
    this.editingMode1 = false;
    this.editingdistrict = null;
    this.editingIndex = null;
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }
  adminUpdateCounty() {
    const countyId = this.editCountyName;
    const county = {
      name: this.countyName,
      districtId: this.districtName1,
    }

    this.countyService.adminUpdateCounty(countyId, county).subscribe({
      next: (response) => {
        this.message1 = 'Concelho alterado com sucesso';
        this.getCounties(this.districtName1);
        this.countyName = null;
        this.editingMode1 = false;
        this.editingIndex = null;
        this.isSuccess = true;
        this.isAlert = false;
        this.isError = false;
      },
      error: (error) => {
        console.error('Erro ao adicionar concelho freelancer:', error);
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

  public exibirMensagem(county): void {
    const snackBarRef = this.snackBar.open("Tem a ceteza que pretende eliminar o concelho?", "Eliminar", {
      duration: 6000
    });
    snackBarRef.onAction().subscribe(() => {
      this.adminDeletCounty(county);
    });
  }

  adminDeletCounty(county: any) {
    const countyId = county.value
    this.countyService.adminDeletCounty(countyId).subscribe({
      next: (response) => {
        this.message1 = 'Conçelho removido com sucesso';
        this.getCounties(this.districtName1)
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


