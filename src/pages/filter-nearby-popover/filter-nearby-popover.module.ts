import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterNearbyPopoverPage } from './filter-nearby-popover';

@NgModule({
  declarations: [
    FilterNearbyPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterNearbyPopoverPage),
  ],
})
export class FilterNearbyPopoverPageModule {}
