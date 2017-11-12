import { DbProvider } from './../db/db';
import { LoginProvider } from './../login/login';
import { Alerta } from './../../models/alerta';
import { Injectable } from '@angular/core';
//import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

/*
  Generated class for the CargaAlertaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargaAlertaProvider {
  //private ALERTAS: string = "alertas";

  constructor(private db: DbProvider, private login: LoginProvider) {
  }

  cargar_alerta(tipo:string, descrip:string, lat:number, lon:number){
    
        let promesa = new Promise((resolve, reject)=>{
          this.db.getJuntaUsuario().then((junta) => {
            let alerta:Alerta = {
              tipo: tipo,
              descripcion: descrip,
              lat: lat,
              lon: lon,
              tiempo: firebase.database.ServerValue.TIMESTAMP,
              usuario: this.login.getUser().uid,
              junta:junta as string
            };
            this.db.nuevaAlerta(alerta).then(()=>{
              resolve();
            })
            
          });
          
        });
    
        return promesa;
      }

}

