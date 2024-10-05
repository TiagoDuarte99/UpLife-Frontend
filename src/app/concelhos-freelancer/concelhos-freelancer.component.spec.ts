import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcelhosFreelancerComponent } from './concelhos-freelancer.component';

describe('ConcelhosFreelancerComponent', () => {
  let component: ConcelhosFreelancerComponent;
  let fixture: ComponentFixture<ConcelhosFreelancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcelhosFreelancerComponent]
    });
    fixture = TestBed.createComponent(ConcelhosFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
