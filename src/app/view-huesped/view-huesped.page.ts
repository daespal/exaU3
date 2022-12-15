import { ReservationService } from './../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservacion } from 'src/app/models/reservacion';

import { Camera, CameraResultType } from '@capacitor/camera';

import * as firebase from 'firebase/compat';

import { Photos } from '../models/photos';

import { Router } from '@angular/router';

//import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-view-huesped',
  templateUrl: './view-huesped.page.html',
  styleUrls: ['./view-huesped.page.scss'],
})
export class ViewHuespedPage implements OnInit {

  picture: string;

  public huesped!: Reservacion;
  public huesp: Reservacion[];
  public total: number = 0;
  public total2: number = 0;
  t: number = 0;
  url: string = "";
  constructor(private activatedRoute: ActivatedRoute, private serviceHo: ReservationService, public route: Router) {

    this.huesped = {
      codigo: "",
      nombre: "",
      telefono: "",
      fechaIni: "",
      fechaEgr: "",
      habitacion: "",
      anticipo: 0,
      total: 0,
      tokens: ""
    }


  }
/*
  async takePicture(){

   //let random = Math.random()*(100000-0)+0;

    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    this.picture = image.dataUrl;

    //this.uploadPicture();

  }*/

  /*uploadPicture(){

    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('${random}.jpg');

    let image = imageRef.putString(this.picture);

  }*/

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.serviceHo.getReservacionById(params.id).subscribe(item => {
        console.log(item);
        this.huesped = item as Reservacion;
      });
    });
    console.log(this.huesped)
  }


}
