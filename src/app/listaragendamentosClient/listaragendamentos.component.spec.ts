import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaragendamentosComponent } from './listaragendamentos.component';

describe('ListaragendamentosComponent', () => {
  let component: ListaragendamentosComponent;
  let fixture: ComponentFixture<ListaragendamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaragendamentosComponent]
    });
    fixture = TestBed.createComponent(ListaragendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
