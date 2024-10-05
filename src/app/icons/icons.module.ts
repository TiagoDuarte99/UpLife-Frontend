import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconStarComponent } from './icon-star/icon-star.component';
import { IconCircleComponent } from './icon-circle/icon-circle.component';
import { IconCursorFingerComponent } from './icon-cursor-finger/icon-cursor-finger.component';
import { IconListCheckComponent } from './icon-list-check/icon-list-check.component';
import { IconAddressBookComponent } from './icon-address-book/icon-address-book.component';
import { IconCalendarComponent } from './icon-calendar/icon-calendar.component';
import { IconUserProfileComponent } from './icon-user-profile/icon-user-profile.component';
import { IconUserProfilePlusComponent } from './icon-user-profile-plus/icon-user-profile-plus.component';
import { IconStarSelectedComponent } from './icon-star-selected/icon-star-selected.component';
import { IconPlusComponent } from './icon-plus/icon-plus.component';
import { IconMinusComponent } from './icon-minus/icon-minus.component';

const ICONS = [
  IconStarComponent,
  IconCircleComponent,
  IconCursorFingerComponent,
  IconListCheckComponent,
  IconAddressBookComponent,
  IconCalendarComponent,
  IconUserProfileComponent,
  IconUserProfilePlusComponent,
  IconStarSelectedComponent,
  IconPlusComponent,
  IconMinusComponent,
];

@NgModule({
  declarations: [...ICONS],
  imports: [CommonModule],
  exports: [...ICONS],
})
export class IconsModule {}
