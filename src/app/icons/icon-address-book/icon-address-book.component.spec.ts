import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAddressBookComponent } from './icon-address-book.component';

describe('IconAddressBookComponent', () => {
  let component: IconAddressBookComponent;
  let fixture: ComponentFixture<IconAddressBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconAddressBookComponent]
    });
    fixture = TestBed.createComponent(IconAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
