import { ReservationService } from './../../services/reservation.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservacion } from 'src/app/models/reservacion';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-huesp',
  templateUrl: './view-huesp.page.html',
  styleUrls: ['./view-huesp.page.scss'],
})
export class ViewHuespPage  {

  public huespedes: Reservacion[] = [];
  public huesped: Reservacion =
    {
      codigo: "1234",
      nombre: "Dalia Esmeralda Palacios Flores",
      telefono: "3112567625",
      fechaIni: "26-Octubre-2022",
      fechaEgr: "31-Octubre-2022",
      habitacion: "1A",
      anticipo: 1000,
      total: 2500
    }


  uid: String = null;

  constructor(private resService: ReservationService, public router:Router) {
    this.huesped = this.resService.huesped;

    console.log('Uesped', this.huesped);

  }

  iracamara(){

    this.router.navigate(['camera']);


  }



}
