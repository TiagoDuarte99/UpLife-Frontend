import { Component } from '@angular/core';
import { AgendarStep } from '../agendar-step';

@Component({
  selector: 'app-agendar-dialog',
  templateUrl: './agendar-dialog.component.html',
  styleUrls: ['./agendar-dialog.component.scss'],
})
export class AgendarDialogComponent {
  AgendarStep = AgendarStep;

  currentStep = AgendarStep.ENDERECO;

  changeStep(step: AgendarStep) {
    this.currentStep = step;
  }
}
