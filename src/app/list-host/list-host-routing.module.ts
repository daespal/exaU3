import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListHostPage } from './list-host.page';

const routes: Routes = [
  {
    path: '',
    component: ListHostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListHostPageRoutingModule {}
