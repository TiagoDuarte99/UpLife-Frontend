import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCalendarComponent } from './icon-calendar.component';

describe('IconCalendarComponent', () => {
  let component: IconCalendarComponent;
  let fixture: ComponentFixture<IconCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconCalendarComponent]
    });
    fixture = TestBed.createComponent(IconCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
