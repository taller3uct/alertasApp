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
  private ALERTAS = 'alertas';
  lastKey: string = null;
  private fecha = new Date();
  private Nfecha = new Date(this.fecha.getDate() + 1506698739642);

  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello CargaAlertaProvider Provider');
    console.log(this.Nfecha.toString());
    console.log(firebase.database.ServerValue.TIMESTAMP);
  }

  // tslint:disable-next-line:one-line
  cargar_alerta(tipo: string, descrip: string, lat: number, lon: number){

        // tslint:disable-next-line:prefer-const
        let promesa = new Promise((resolve, reject) => {
          // tslint:disable-next-line:prefer-const
          let alerta: subirAlerta = {
            tipo: tipo,
            descripcion: descrip,
            lat: lat,
            lon: lon,
            tiempo: firebase.database.ServerValue.TIMESTAMP
          };
          // tslint:disable-next-line:prefer-const
          let $key = this.afDB.database.ref('/alertas').push( alerta ).key;
          alerta.$key = $key;
          console.log(alerta.$key);
          resolve();
        });

        return promesa;
      }

}

// tslint:disable-next-line:class-name
interface subirAlerta {
  $key?: string;
  tipo: string;
  descripcion: string;
  lat: number;
  lon: number;
  tiempo: object;
}

