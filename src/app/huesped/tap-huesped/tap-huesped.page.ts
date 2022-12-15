
import { ReservationService } from '../../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservacion } from 'src/app/models/reservacion';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-tap-huesped',
  templateUrl: './tap-huesped.page.html',
  styleUrls: ['./tap-huesped.page.scss'],
})
export class TapHuespedPage implements OnInit {
  public huesped: Reservacion;
  public id:string;
  uid: String = null;
  constructor(private resService:ReservationService,private activatedRoute:ActivatedRoute, private serviceHo:ReservationService, private router:Router,
    private auth:AngularFireAuth) {
    this.resService.stateUser().subscribe(res=>{
      if (res){
        console.log('Esta logeado')
      }else{
        console.log('No esta logeado')
      }
    })
   }

  async ngOnInit() {
    console.log('Estoy en perfil');
    const uid = await this.resService.getUId()
    if (uid) { 
      this.uid = uid;
      console.log(this.uid)
    }else{
      console.log('No existe uid')
    }
  }
stateUser(){

}
}
