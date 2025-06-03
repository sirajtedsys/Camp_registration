import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterUrlPage } from './enter-url.page';

const routes: Routes = [
  {
    path: '',
    component: EnterUrlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterUrlPageRoutingModule {}
