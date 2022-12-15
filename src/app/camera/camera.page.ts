import { Component } from '@angular/core';
import {Camera, CameraResultType } from '@capacitor/camera';
import { ReservationService } from '../services/reservation.service';
import { Photos } from '../models/photos';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage  {

  picture: string;

  constructor(public service: ReservationService) { }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.picture = image.dataUrl;

    console.log(this.picture);




    // this.service.addPhoto(this.picture);




  }





}
