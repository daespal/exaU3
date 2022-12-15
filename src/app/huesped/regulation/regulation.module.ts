import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegulationPageRoutingModule } from './regulation-routing.module';

import { RegulationPage } from './regulation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegulationPageRoutingModule,
    TranslateModule
  ],
  declarations: [RegulationPage]
})
export class RegulationPageModule {}
