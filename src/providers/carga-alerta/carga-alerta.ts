import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

/*
  Generated class for the CargaAlertaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargaAlertaProvider {
  private ALERTAS: string = "alertas";
  lastKey:string = null;
  private fecha = new Date();
  private Nfecha = new Date(this.fecha.getDate() + 1506698739642)

  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello CargaAlertaProvider Provider');
    console.log(this.Nfecha.toString())
    console.log(firebase.database.ServerValue.TIMESTAMP)
  }

  cargar_alerta(tipo:string, descrip:string, lat:number, lon:number){
    
        let promesa = new Promise((resolve, reject)=>{
          let alerta:subirAlerta = {
            tipo: tipo,
            descripcion: descrip,
            lat: lat,
            lon: lon,
            tiempo: firebase.database.ServerValue.TIMESTAMP
          };
          let $key = this.afDB.database.ref('/alertas').push( alerta ).key;
          alerta.$key = $key;
          console.log(alerta.$key);
          resolve();
        });
    
        return promesa;
      }

}

interface subirAlerta{
  $key?:string
  tipo:string
  descripcion:string
  lat:number
  lon:number
  tiempo:object
}