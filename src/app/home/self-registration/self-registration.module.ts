import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfRegistrationPageRoutingModule } from './self-registration-routing.module';

import { SelfRegistrationPage } from './self-registration.page';
import { ItemListTablePageModule } from '../item-list-table/item-list-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfRegistrationPageRoutingModule,
    ItemListTablePageModule
  ],
  declarations: [SelfRegistrationPage]
})
export class SelfRegistrationPageModule {}
