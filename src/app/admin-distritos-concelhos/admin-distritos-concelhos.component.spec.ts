import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDistritosConcelhosComponent } from './admin-distritos-concelhos.component';

describe('AdminDistritosConcelhosComponent', () => {
  let component: AdminDistritosConcelhosComponent;
  let fixture: ComponentFixture<AdminDistritosConcelhosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDistritosConcelhosComponent]
    });
    fixture = TestBed.createComponent(AdminDistritosConcelhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
