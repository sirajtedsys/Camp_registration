import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfRegistrationPage } from './self-registration.page';

const routes: Routes = [
  {
    path: '',
    component: SelfRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfRegistrationPageRoutingModule {}
