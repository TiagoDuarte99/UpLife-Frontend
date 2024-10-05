import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStarSelectedComponent } from './icon-star-selected.component';

describe('IconStarSelectedComponent', () => {
  let component: IconStarSelectedComponent;
  let fixture: ComponentFixture<IconStarSelectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconStarSelectedComponent]
    });
    fixture = TestBed.createComponent(IconStarSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
