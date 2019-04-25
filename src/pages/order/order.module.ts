import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrderPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPage),
    PipesModule
  ],
})
export class OrderPageModule {}
