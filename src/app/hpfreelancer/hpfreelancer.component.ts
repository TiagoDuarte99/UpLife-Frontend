import { Component } from '@angular/core';

@Component({
  selector: 'app-hpfreelancer',
  templateUrl: './hpfreelancer.component.html',
  styleUrls: ['./hpfreelancer.component.scss']
})
export class HPfreelancerComponent {
  selectedComponent: string = '';

  ngOnInit(): void {
    this.selectedComponent = 'horario'
  }

  showComponent(componentName: string): void {
    this.selectedComponent = componentName;
    window.scrollTo(0,0)
  }
}
