import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewHuespPage } from './view-huesp.page';

const routes: Routes = [
  {
    path: '',
    component: ViewHuespPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewHuespPageRoutingModule {}
