import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservacion } from 'src/app/models/reservacion';
import { Administrador } from './../models/administrador';
import { ReservationService } from './../services/reservation.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public admi:Administrador[];
  public usuario:Reservacion[];
  public myForm: FormGroup;
  public codigo:string="";

  public login:number[];
  public huesped: Reservacion[];

  credenciales  = {
    ingreso: null
  }
  constructor(private router: Router,private alertController: AlertController, private service:ReservationService, private fb: FormBuilder, private navCtrl: NavController,
    private auth: AngularFireAuth) {
    this.myForm = this.fb.group({
      codigo:["", Validators.required]
    });
    this.service.getReservacion().subscribe(res => {
      this.huesped = res;
      console.log(this.huesped)
    });

  }



  async loginPrueba (){
    this.service.huespedes = this.huesped;
    this.huesped.forEach(item=>{
      this.service.codigoAdm.push(item.codigo)
    });
    this.service.validarToken(this.myForm.get('codigo').value);
    this.service.getHuespedByCodigo(this.myForm.get('codigo').value)
  }
  public buscarUsuario(){
    this.codigo = this.myForm.controls.codigo.value;
  
    console.log(this.codigo);
    
    this.service.getAdmin().subscribe(res => {
      this.admi = res;
      console.log(this.admi)
      this.admi.forEach(i=>{

        if (i.codigo.localeCompare(this.codigo)==0 ){
          console.log("si existe")
          this.ingresarAdmi();
          //your awesome code here
        } else {
          this.buscarHost()
          console.log("no existe");
                    
          //your awesome code here
        }  
    });

    });

   
  }


  public buscarHost(){
    this.service.getReservacion().subscribe(res => {
      this.usuario = res;
      console.log(this.usuario)
      this.usuario.forEach(i=>{

        if (i.codigo.localeCompare(this.codigo)==0 ){
          console.log("si existe")
          this.ingresarHost();
          this.getUsuarioByCodigo(this.codigo);
          //your awesome code here
        } else {
          console.log("no existe");
          //your awesome code here
        }  
    });
  });
  }

  public ingresarAdmi(){
    this.router.navigate(['list-host'])
  }

  public ingresarHost(){
    this.router.navigate(['view-huesped'])
  }

 

  public getUsuarioByCodigo(codigo:string){
    this.router.navigate(['tap-huesped'],{
      queryParams: {codigo:codigo}
     
    });
    console.log(this.codigo);
  }
  
 
}
