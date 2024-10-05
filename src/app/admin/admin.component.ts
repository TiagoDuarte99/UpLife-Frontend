import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  selectedComponent: string = '';
  currentTab: string = 'Estatisticas';

  ngOnInit(): void {
    this.selectedComponent = 'Estatisticas'
  }

  showComponent(componentName: string): void {
    this.selectedComponent = componentName;
    this.currentTab = componentName;
    window.scrollTo(0,0)
  }
}
