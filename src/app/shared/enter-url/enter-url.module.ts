import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterUrlPageRoutingModule } from './enter-url-routing.module';

import { EnterUrlPage } from './enter-url.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterUrlPageRoutingModule
  ],
  declarations: [EnterUrlPage]
})
export class EnterUrlPageModule {}
