import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCircleComponent } from './icon-circle.component';

describe('IconCircleComponent', () => {
  let component: IconCircleComponent;
  let fixture: ComponentFixture<IconCircleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconCircleComponent]
    });
    fixture = TestBed.createComponent(IconCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
