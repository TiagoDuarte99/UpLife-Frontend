import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesFreelancerComponent } from './services-freelancer.component';

describe('ServicesFreelancerComponent', () => {
  let component: ServicesFreelancerComponent;
  let fixture: ComponentFixture<ServicesFreelancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesFreelancerComponent]
    });
    fixture = TestBed.createComponent(ServicesFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
