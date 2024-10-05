import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCursorFingerComponent } from './icon-cursor-finger.component';

describe('IconCursorFingerComponent', () => {
  let component: IconCursorFingerComponent;
  let fixture: ComponentFixture<IconCursorFingerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconCursorFingerComponent]
    });
    fixture = TestBed.createComponent(IconCursorFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
