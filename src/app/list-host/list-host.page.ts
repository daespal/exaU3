import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReservationService } from './../services/reservation.service';
import { Reservacion } from './../models/reservacion';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-list-host',
  templateUrl: './list-host.page.html',
  styleUrls: ['./list-host.page.scss'],
})
export class ListHostPage implements OnInit {


  public huesped!: Reservacion[];
  public huespe!: Reservacion;
  public ind: number = 0;
  public codigo: number = Math.random();
  public fecha = new Date();

  url: string = "";
  constructor(private huespService: ReservationService, private router: Router, private alertController: AlertController,
    private auth: AngularFireAuth) {
    this.huespService.getReservacion().subscribe(res => {
      this.huesped = res;
      console.log(this.huesped)
    });
    this.url = this.huespService.setWats();
    this.huespService.stateUser().subscribe(res => {
      if (res) {
        console.log('Esta logeado')
      } else {
        console.log('No esta logeado')
      }
    }
    )
  }

  public removeReservation(pos: string) {
    this.huespService.removeReservation(pos);

  }
  logut() {
    //this.auth.signOut();
    this.router.navigate([''])
  }


  public async error() {

    const alert = await this.alertController.create({
      header: 'ALERTA',
      subHeader: 'Revise que los campos estén completos',
      message: 'Uno o más campos no son correctos, revise por favor',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.alertAddHuesped();
          }
        }
      ]
    });

    await alert.present();
  }

  /*  public getReservationByIndex(i: number) {
      this.ind = i;
      console.log(this.ind)
      this.router.navigate(['view-huesped'], {
        queryParams: { pos: i, ant: this.huesped[i].anticipo.valueOf(), to: this.huesped[i].total.valueOf() }
      })
    }*/

  public getReservacionById(id: string) {
    this.router.navigate(['/view-huesped'], {
      queryParams: { id: id },
    })
  }
  async presentAlert(id: string) {
    const alert = await this.alertController.create({
      header: '¿Quiere borrar un huesped de la lista?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {

            this.removeReservation(id);

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

  public getRandomIntegerBetweenRange(min: number, max: number): number {
    let x: number;
    x = (Math.random() * ((max - min) + 1)) + min;
    return x;
  }

  getHabitacion(): any {
    //regresa el numero de habitacion registrado
    let nHab = '';
    for (let i = 0; i < this.huesped.length; i++) {
      nHab = this.huesped[i].habitacion.valueOf();
      return nHab;
    }
    return null;
  }

  public addHuesped(){
    this.router.navigate(['/new-reservacion'])
  }
  async alertAddHuesped(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Ingrese la información de su nueva reservacion',
      inputs: [
        {
          name: 'codigo',
          type: 'text',
          placeholder: this.getRandomIntegerBetweenRange(1000, 10000).toString()
        },
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'telefono',
          type: 'text',
          placeholder: 'Télefono'
        },
        {
          name: 'fechaIni',
          type: 'date',
          label: "Fecha de inicio",
          min:  this.fecha.toString()
        },
        {
          name: 'fechaEgr',
          type: 'date',
          label: "Fecha de egreso",
          
        },
        {
          name: 'habitacion',
          type: 'text',
          placeholder: 'Habitación'
        },
        {
          name: 'anticipo',
          type: 'number',
          placeholder: 'Anticipo'
        },
        {
          name: 'total',
          type: 'number',
          placeholder: 'Total'
        },
        {
          name: 'tokens',
          type: 'text',
          placeholder: 'tokens'
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      },
      {
        text: 'Aceptar',
        handler: (alertData) => {
          //comparar fechas para que egreso sea mayor a ingreso
          //compara numero de habitacion
          if (alertData.fechaIni.getTime > alertData.fechaEgr.getTime) {
            this.alertErrorFecha();
            this.error();
            //not working correctly
          }
          if (alertData.habitacion == this.getHabitacion()) {
            this.error();
            this.alertErrorHabitacion();
          } else {
            if (alertData.foto == "" || alertData.description == "" || alertData.precio == "") {
              this.error();
            } else {
              let i = this.huesped.length + 1;
              this.huespe = {
                codigo: alertData.codigo,
                nombre: alertData.nombre,
                telefono: alertData.telefono,
                fechaIni: alertData.fechaIni,
                fechaEgr: alertData.fechaEgr,
                habitacion: alertData.habitacion,
                anticipo: alertData.anticipo,
                total: alertData.total,
                tokens: alertData.tokens
              }
              console.log(this.huespService.addHuesped(this.huespe));
              this.huespService.whatsapp(alertData.telefono, alertData.codigo);

            }
          }
        }

      }],
    });
    await alert.present();
  }

  ngOnInit() {
    return;
  }

  public whatsapp(whatsappnumber: string, codigo: string): string {
    let countrycode: string = "52";
    let url: string = "https://wa.me/" + countrycode + whatsappnumber + "?text=Hola%20gracias%20por%20reservar%20con%20nosotros,%20su%20codigo%20de%20acceso%20es:" + codigo;
    console.log(url);
    return url
  }


  async alertErrorFecha() {
    const alert = await this.alertController.create({
      header: 'Existe un error con la fecha, debe de ser mayor a la de ingreso',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  async alertErrorHabitacion() {
    const alert = await this.alertController.create({
      header: 'Existe un error con la habitacion, ya esta ocupada esos dias',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

}
