import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'camp-registration',
        loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./self-registration/self-registration.module').then( m => m.SelfRegistrationPageModule)
      },
    ]
  },
  {
    path: 'e-p-d',
    loadChildren: () => import('./e-p-d/e-p-d.module').then( m => m.EPDPageModule)
  },
  {
    path: 'item-list-table',
    loadChildren: () => import('./item-list-table/item-list-table.module').then( m => m.ItemListTablePageModule)
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
