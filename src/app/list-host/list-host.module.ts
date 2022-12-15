import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListHostPageRoutingModule } from './list-host-routing.module';

import { ListHostPage } from './list-host.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListHostPageRoutingModule
  ],
  declarations: [ListHostPage]
})
export class ListHostPageModule {}
