import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTiposServicosComponent } from './admin-tipos-servicos.component';

describe('AdminTiposServicosComponent', () => {
  let component: AdminTiposServicosComponent;
  let fixture: ComponentFixture<AdminTiposServicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTiposServicosComponent]
    });
    fixture = TestBed.createComponent(AdminTiposServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
