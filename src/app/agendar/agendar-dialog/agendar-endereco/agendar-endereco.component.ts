import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountyService } from 'src/app/services/county.service';
import { DistrictService } from 'src/app/services/district.service';
import { AgendarStep } from '../../agendar-step';

@Component({
  selector: 'app-agendar-endereco',
  templateUrl: './agendar-endereco.component.html',
  styleUrls: ['./agendar-endereco.component.scss'],
})
export class AgendarEnderecoComponent implements OnInit {
  districts = [];
  counties = [];
  formGroup: FormGroup;

  @Output() nextStep = new EventEmitter<AgendarStep>();

  constructor(
    private formBuilder: FormBuilder,
    private districtService: DistrictService,
    private countyService: CountyService
  ) {
    this.formGroup = this.formBuilder.group({
      district: [undefined],
      county: [undefined],
      postalCode: [undefined],
      address: [undefined],
    });
    this.listenDistrictChanges();
  }

  ngOnInit(): void {
    this.districtService.getDistricts().subscribe((data) => {
      this.districts = data.map((district) => {
        return {
          value: district.id,
          viewValue: district.name,
        };
      });
    });
  }

  changeStep() {
    this.nextStep.emit(AgendarStep.LIMPEZA_RESIDENCIAL);
  }

  private listenDistrictChanges() {
    this.formGroup
      .get('district')
      .valueChanges.subscribe((districtId) => this.getCounties(districtId));
  }

  private getCounties(districtId: number) {
    this.countyService.getCounties(districtId).subscribe(
      (data) =>
        (this.counties = data.map((county) => {
          return {
            value: county.countyName,
            viewValue: county.countyName,
          };
        }))
    );
  }
}
