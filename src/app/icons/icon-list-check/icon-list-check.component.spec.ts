import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconListCheckComponent } from './icon-list-check.component';

describe('IconListCheckComponent', () => {
  let component: IconListCheckComponent;
  let fixture: ComponentFixture<IconListCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconListCheckComponent]
    });
    fixture = TestBed.createComponent(IconListCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
