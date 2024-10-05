import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUserProfileComponent } from './icon-user-profile.component';

describe('IconUserProfileComponent', () => {
  let component: IconUserProfileComponent;
  let fixture: ComponentFixture<IconUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconUserProfileComponent]
    });
    fixture = TestBed.createComponent(IconUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
