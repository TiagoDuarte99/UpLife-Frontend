import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioFreelancerComponent } from './horario-freelancer.component';

describe('HorarioFreelancerComponent', () => {
  let component: HorarioFreelancerComponent;
  let fixture: ComponentFixture<HorarioFreelancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioFreelancerComponent]
    });
    fixture = TestBed.createComponent(HorarioFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
