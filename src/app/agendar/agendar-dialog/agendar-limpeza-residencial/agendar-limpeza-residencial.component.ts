import { Component, EventEmitter, Output } from '@angular/core';
import { FreelancerService } from 'src/app/services/freelancer.service';
import { AgendarStep } from '../../agendar-step';

@Component({
  selector: 'app-agendar-limpeza-residencial',
  templateUrl: './agendar-limpeza-residencial.component.html',
  styleUrls: ['./agendar-limpeza-residencial.component.scss'],
})
export class AgendarLimpezaResidencialComponent {
  hours = 1;
  @Output() nextStep = new EventEmitter<AgendarStep>();

  constructor(private freelancerService: FreelancerService) {}

  plus() {
    this.hours++;
  }
  minus() {
    if (this.hours === 1) {
      return;
    }
    this.hours--;
  }

  getFreelancers() {
    this.freelancerService.getFreelancers(1, {}).subscribe({
      next: (data) => {
        if (!data.response.length) {
          this.nextStep.emit(AgendarStep.RECEBER_INFORMACOES);
        }
        console.log(data);
      },
      error: () => this.nextStep.emit(AgendarStep.RECEBER_INFORMACOES),
    });
  }
}
