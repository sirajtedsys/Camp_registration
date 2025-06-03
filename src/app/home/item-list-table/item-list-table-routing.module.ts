import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListTablePage } from './item-list-table.page';

const routes: Routes = [
  {
    path: '',
    component: ItemListTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemListTablePageRoutingModule {}
