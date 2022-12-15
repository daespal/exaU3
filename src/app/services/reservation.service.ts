import { Photos } from './../models/photos';
import { NavigationExtras, Router } from '@angular/router';
import { getTestBed } from '@angular/core/testing';
import { Administrador } from './../models/administrador';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservacion } from '../models/reservacion';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { of, firstValueFrom } from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public huespedes: Reservacion[];
  public huesped: Reservacion;
  public codigoAdm = ['admin'];
  public codigo = '';
  public login: string[];
  public url: string = "";
  public photo: Photos;


  constructor(private firestore: AngularFirestore, private authFirebase: AngularFireAuth, private router:Router) {
    this.huespedes = [
      {
        //id: "11",
        codigo: "1234",
        nombre: "Dalia Esmeralda Palacios Flores",
        telefono: "3112567625",
        fechaIni: "26-Octubre-2022",
        fechaEgr: "31-Octubre-2022",
        habitacion: "1A",
        anticipo: 1000,
        total: 2500,
        tokens: ""
      },
      {
        //id: "12",
        codigo: "1335",
        nombre: "Ariaja Jazmin Palacios Flores",
        telefono: "3112567625",
        fechaIni: "26-Diciembre-2022",
        fechaEgr: "31-Diciembre-2022",
        habitacion: "1C",
        anticipo: 300,
        total: 4000,
        tokens: ""
      },
      {
        //id: "13",
        codigo: "1436",
        nombre: "Azucena Monserrat Palacios Flores",
        telefono: "3111373182",
        fechaIni: "27-noviembre-2022",
        fechaEgr: "30-Noviembre-2022",
        habitacion: "2A",
        anticipo: 300,
        total: 4000,
        tokens: ""
      },
    ];

    this.login = ["1234", "1335", "1436"];


  }




  validarToken(token: string){
    if (token === this.codigoAdm[0]){
      this.router.navigate(['/list-host']);
    }else if(this.codigoAdm.includes(token)){
      let navigation: NavigationExtras = {
        state:{
          codigoAdm: token
        }
      }
      this.router.navigate(['/tap-huesped/view-huesp'], navigation)
    }

  }

  public getHuespedByCodigo(token: string){
    this.huespedes.forEach(item =>{
      if(item.codigo === token){
        this.huesped = item;
      }
    })
  }

  public getReservacion(): Observable<Reservacion[]> {
    return this.firestore.collection('Reservacion').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data() as Reservacion;
          console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }


  public getAdmin(): Observable<Administrador[]> {
    return this.firestore.collection('Administrador').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          console.log(a);
          const data = a.payload.doc.data() as Administrador;
          console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  public getLogin() {
    return this.login
  }

  public whatsapp(whatsappnumber: string, codigo: string) {
    let countrycode: string = "52";
    let url: string = "https://wa.me/" + countrycode + whatsappnumber + "?text=Hola%20gracias%20por%20reservar%20con%20nosotros,%20su%20codigo%20de%20acceso%20es:" + codigo;
    console.log(url);
    this.url = url
  }

  public setWats() {
    return this.url
  }

  public removeReservation(id: string) {
    this.firestore.collection('Reservacion').doc(id).delete();
  }

  public getReservationByIndex(i: number): Reservacion {
    return this.huespedes[i];
  }
  public addHuesped(huesped: Reservacion) {
    this.firestore.collection('Reservacion').add(huesped);
  }

  public getReservationByIndex2(i: number) {
    return i;
  }

  public getReservationByIndex3(i: number) {
    return i;
  }

  public getReservacionById(id: string) {
    let result = this.firestore.collection('Reservacion').doc(id).valueChanges();
    return result
  }

  public getUsuarioByCodigo(codigo: string) {
    let result = this.firestore.collection('Reservacion').doc(codigo).valueChanges();
    return result;
  }
  public getUsuarioByCodigoTabs(codigo: string) {
    let result = this.firestore.collection('Reservacion').doc(codigo).valueChanges();
    return result;
  }

  async getUId() {
    const user = await this.authFirebase.currentUser
    if (user) {
      return user.uid;
    } else {
      return null
    }
  }

  loginPrueba(ingreso: string){
    this.authFirebase.signInWithPhoneNumber;
  }
  stateUser(){
    return this.authFirebase.authState
  }

  public addPhoto(photo: Photos){

    this.firestore.collection('photo').add(photo);

  }
}

