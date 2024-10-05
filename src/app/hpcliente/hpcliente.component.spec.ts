import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HPclienteComponent } from './hpcliente.component';

describe('HPclienteComponent', () => {
  let component: HPclienteComponent;
  let fixture: ComponentFixture<HPclienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HPclienteComponent]
    });
    fixture = TestBed.createComponent(HPclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
