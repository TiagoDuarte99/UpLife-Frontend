import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUserProfilePlusComponent } from './icon-user-profile-plus.component';

describe('IconUserProfilePlusComponent', () => {
  let component: IconUserProfilePlusComponent;
  let fixture: ComponentFixture<IconUserProfilePlusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconUserProfilePlusComponent]
    });
    fixture = TestBed.createComponent(IconUserProfilePlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
