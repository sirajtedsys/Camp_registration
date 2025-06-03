import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EPDPageRoutingModule } from './e-p-d-routing.module';

import { EPDPage } from './e-p-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EPDPageRoutingModule
  ],
  declarations: [EPDPage]
})
export class EPDPageModule {}
