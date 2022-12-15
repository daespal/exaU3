import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { TapHuespedPageRoutingModule } from './tap-huesped-routing.module';
import { TapHuespedPage } from './tap-huesped.page';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireDatabaseModule,
    TapHuespedPageRoutingModule,
    TranslateModule
  ],
  declarations: [TapHuespedPage]
})
export class TapHuespedPageModule {}
