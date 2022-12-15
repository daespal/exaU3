import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TapHuespedPage } from './tap-huesped.page';

const routes: Routes = [
  {
    path: '',
    component: TapHuespedPage,
    children:[
      {
        path: 'view-huesp',
        loadChildren: () => import('../view-huesp/view-huesp.module').then( m => m.ViewHuespPageModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('../activities/activities.module').then( m => m.ActivitiesPageModule)
      },
      {
        path: 'regulation',
        loadChildren: () => import('../regulation/regulation.module').then( m => m.RegulationPageModule)
      },
      {
        path: 'mapa',
        loadChildren: () => import('../mapa/mapa.module').then( m => m.MapaPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TapHuespedPageRoutingModule {}
