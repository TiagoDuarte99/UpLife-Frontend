import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConcelhosComponent } from './admin-concelhos.component';

describe('AdminConcelhosComponent', () => {
  let component: AdminConcelhosComponent;
  let fixture: ComponentFixture<AdminConcelhosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminConcelhosComponent]
    });
    fixture = TestBed.createComponent(AdminConcelhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
