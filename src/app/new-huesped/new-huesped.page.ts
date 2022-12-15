import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservacion } from '../models/reservacion';
import { ReservationService } from '../services/reservation.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-huesped',
  templateUrl: './new-huesped.page.html',
  styleUrls: ['./new-huesped.page.scss'],
})
export class NewHuespedPage implements OnInit {

  public huesped!: Reservacion
  public myForm!: FormGroup;
  public validationMessages!: object;

  constructor(private huespService:ReservationService, 
    private fb: FormBuilder, private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      codigo: ["0123",Validators.required],
      nombre: ["Andrés Zurita",Validators.required],
      telefono: [0,Validators.required],
      fechaIni: ["20/10/2022",Validators.required],
      fechaEgr: ["30/10/2022",Validators.required],
      habitacion: ["A1",Validators.required],
      anticipo: [0,Validators.required],
      total: [0, Validators.compose([Validators.required])]
    });
    this.validationMessages = {
      
      'codigo': [
        { type: 'required', message: "Debe capturar el código" }
      ],
      'nombre': [
        { type: 'required', message: "Debe capturar el nombre" }
      ],
      'telefono': [
        { type: 'required', message: "Ingrese el telefono del cliente" },
      ],
      'fechaIni': [
        { type: 'required', message: "Capture la fecha de egreso" },
      ],
      'fechaEgr': [
        { type: 'required', message: "Capture la fecha de egreso" },
      ],
      'habitacion': [
        { type: 'required', message: "Capture en que habitación se quedará el huesped" },
      ],
      'anticipo': [
        { type: 'required', message: "Ingrese el anticipo" }
      ],
      'total': [
        { type: 'required', message: "Ingrese el total de la habitación" }
      ]
    }
  }

  public newHuesped() {
    this.huesped = {
      codigo: this.myForm.controls.codigo.value,
      nombre: this.myForm.controls.nombre.value,
      telefono: this.myForm.controls.telefono.value,
      fechaIni: this.myForm.controls.fechaIni.value,
      fechaEgr: this.myForm.controls.fechaEgr.value,
      habitacion: this.myForm.controls.habitacion.value,
      anticipo: this.myForm.controls.anticipo.value,
      total: this.myForm.controls.total.value,
      tokens: this.myForm.controls.tokens.value
    }
    console.log(this.huespService.addHuesped(this.huesped));
    this.presentToast("top");
    this.router.navigate(['..']); // Regresa a la ventana anterior una vwz que se registro
  }
  async presentToast(position: 'top'| 'middle' | 'bottom'){
    const toast = await this.toastController.create({
      message: 'Estudiante guardado correctamente.',
      duration: 3000,
      position,
      color:'success'
    })
    await toast.present();
  }

}
