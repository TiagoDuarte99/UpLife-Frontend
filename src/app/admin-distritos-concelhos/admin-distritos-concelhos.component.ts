import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountyService } from '../services/county.service';
import { DistrictService } from '../services/district.service';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-distritos-concelhos',
  templateUrl: './admin-distritos-concelhos.component.html',
  styleUrls: ['./admin-distritos-concelhos.component.scss']
})
export class AdminDistritosConcelhosComponent {

  formGroup: FormGroup;
  districts: any[];
  countys: any[];
  districtName: string;
  districtName1: number;



  message1 = 'Your registration has been saved successfully';
  alert1 = 'The field is required';
  isSuccess = false;
  isAlert = false;
  isError = false;

  editingIndex: number | null = null;
  editingMode: boolean = false;
  editingMode1: boolean = false;
  editingdistrict: {} = {};
  editingdistrictId: number;

  constructor(

    private formBuilder: FormBuilder,
    private districtService: DistrictService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.getDistricts();
    this.districtName = "Aveiro"

  }

  private createFormGroup() {
    this.formGroup = this.formBuilder.group({
      district: [undefined],
      county: [undefined],
    });
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

  adminAddDistrict() {
    console.log(this.districtName)
    const district = {
      name: this.districtName
    }
    this.districtService.adminAddDistrict(district).subscribe({
      next: (response) => {
        this.getDistricts();
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

  editDistrict(district: any, index: number) {
    console.log(district)
    this.editingMode = true;
    this.editingdistrict = district;
    this.editingIndex = index;
    this.editingdistrictId = district.value;
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  }
  cancelEdit() {
    this.editingMode = false;
    this.editingdistrict = null;
    this.editingIndex = null;
    this.isSuccess = false;
    this.isAlert = false;
    this.isError = false;
  }

  updateDistrict() {
    const districtId = this.editingdistrictId;
    const district = {
      id: districtId,
      name: this.districtName
    }
    debugger

    this.districtService.updateDistrict(districtId, district).subscribe({
      next: (response) => {
        this.getDistricts();
        this.districtName = null;
        this.editingMode = false;
        this.editingdistrict = null;
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

  public exibirMensagem(district): void {
    const snackBarRef = this.snackBar.open("Tem a ceteza que pretende eliminar o distrito?", "Eliminar", {
      duration: 6000
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteDistrict(district);
    });
  }

  deleteDistrict(district: any) {

    const districtId = district.value

    this.districtService.deleteDistrict(districtId).subscribe({
      next: (response) => {
        this.message1 = 'Destrito removido com sucesso';
        this.getDistricts()
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






