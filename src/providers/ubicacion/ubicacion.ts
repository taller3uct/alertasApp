import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionProvider {
  private lat:number;
  private lon:number;

  constructor(private geolocation:Geolocation) {
    console.log('Hello UbicacionProvider Provider');
  }
  iniciar_localizacion(){
    let promesa = new Promise((resolve, reject)=>{
      this.geolocation.getCurrentPosition().then((resp) => {
       // resp.coords.latitude
       // resp.coords.longitude
       this.lat = resp.coords.latitude;
       this.lon = resp.coords.longitude;
       resolve();
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

    return promesa;
  }

  latitud(){
    return this.lat;
  }
  longitud(){
    return this.lon;
  }
}
