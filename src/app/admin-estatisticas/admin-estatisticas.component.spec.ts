import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEstatisticasComponent } from './admin-estatisticas.component';

describe('AdminEstatisticasComponent', () => {
  let component: AdminEstatisticasComponent;
  let fixture: ComponentFixture<AdminEstatisticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEstatisticasComponent]
    });
    fixture = TestBed.createComponent(AdminEstatisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
