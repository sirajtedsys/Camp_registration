import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemListTablePageRoutingModule } from './item-list-table-routing.module';

import { ItemListTablePage } from './item-list-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemListTablePageRoutingModule
  ],
  declarations: [ItemListTablePage],
  exports:[ItemListTablePage]
})
export class ItemListTablePageModule {}
