import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HPfreelancerComponent } from './hpfreelancer.component';

describe('HPfreelancerComponent', () => {
  let component: HPfreelancerComponent;
  let fixture: ComponentFixture<HPfreelancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HPfreelancerComponent]
    });
    fixture = TestBed.createComponent(HPfreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
