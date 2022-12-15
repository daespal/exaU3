import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewHuespPageRoutingModule } from './view-huesp-routing.module';

import { ViewHuespPage } from './view-huesp.page';

import { TranslateModule } from '@ngx-translate/core';


import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewHuespPageRoutingModule,
    TranslateModule,
    AngularFireDatabaseModule,
    AngularFireModule,AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [ViewHuespPage]
})
export class ViewHuespPageModule {}
