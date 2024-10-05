import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaEscolhaComponent } from './criar-conta-escolha.component';

describe('CriarContaEscolhaComponent', () => {
  let component: CriarContaEscolhaComponent;
  let fixture: ComponentFixture<CriarContaEscolhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarContaEscolhaComponent]
    });
    fixture = TestBed.createComponent(CriarContaEscolhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
