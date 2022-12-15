import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  public map: mapboxgl.Map;
  public marker1:mapboxgl.Marker;
  public style='mapbox://styles/mapbox/streets-v12';
  lat:number
  lon:number 


  constructor(public geolocation:Geolocation) {
    mapboxgl.accessToken = environment.MAPBOX_KEY
    this.getGeolocationLat();
    this.getGeolocationLon();
   }

  ngOnInit() {
  }


  ionViewWillEnter(){
   if(!this.map){
    this.buildMap();
   }
   
  }

  
  getGeolocationLat(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      return this.lat;

    });
  
  }

  getGeolocationLon(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      this.map = new mapboxgl.Map({
        container: 'mapa-box', // container ID
        style: this.style, // style URL
        center: [this.lon, this.lat], // starting position [lng, lat]
        zoom: 14, // starting zoom
       
        });

        this.marker1 = new mapboxgl.Marker()
.setLngLat([this.lon, this.lat])
.addTo(this.map);
        
    
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.resize();
    });
  
  }

  buildMap(){

    this.map.resize();
  }
 

}
