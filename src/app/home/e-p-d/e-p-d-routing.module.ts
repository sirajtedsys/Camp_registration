import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EPDPage } from './e-p-d.page';

const routes: Routes = [
  {
    path: '',
    component: EPDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EPDPageRoutingModule {}
