import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFreelancerComponent } from './perfil-freelancer.component';

describe('PerfilFreelancerComponent', () => {
  let component: PerfilFreelancerComponent;
  let fixture: ComponentFixture<PerfilFreelancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilFreelancerComponent]
    });
    fixture = TestBed.createComponent(PerfilFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
