import { UltimosPage } from './../ultimos/ultimos';
import { Alerta } from './../../models/alerta';
import { UbicacionProvider } from './../../providers/ubicacion/ubicacion';
import { Component } from '@angular/core';
import { NavController, ModalController, MenuController, NavParams, ActionSheetController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";
import { LoginPage } from "../login/login";
import { DescripPage } from "../descrip/descrip";
import { CallNumber } from '@ionic-native/call-number';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import { LoginProvider } from "../../providers/login/login";

import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  alertas: Observable<Alerta[]>;
  posicion: Observable<Coordinates>;
  lat: number;
  lon: number;
  tempMarker = { ver: false, lat: 0, lon: 0 };
  band = false;

  tiposAlertas = {
    "Policial": {
      "numero": "133",
      "nombre": "Carabineros"
    },
    "Ambulancia": {
      "numero": "131",
      "nombre": "Ambulancia"
    },
    "Incendio": {
      "numero": "132",
      "nombre": "Bomberos"
    }
  }

  constructor(public navCtrl: NavController,
    private afDB: AngularFireDatabase,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private _login: LoginProvider,
    private pos: UbicacionProvider,
    private callNumber: CallNumber,
    private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode) {

    
    this.backgroundMode.enable();
    this.backgroundMode.setDefaults({
      silent: true
    })
    this.backgroundMode.overrideBackButton();  
    

    this.posicion = this.pos.getPos().map(a => {
      let coords = a.coords;
      return coords;
    })
    this.pos.iniciar_localizacion().then(data => {
      this.lat = this.pos.latitud()
      this.lon = this.pos.longitud()
      this.tempMarker.lat = this.lat;
      this.tempMarker.lon = this.lon;
    })
    this._login.isLogin().then(res => {
      if (res) {
        this.alertas = afDB.list('/alertas', ref => ref.orderByChild('tiempo').startAt(this.ultimos())).valueChanges();
        afDB.database.ref('/alertas').on('value', (childSnapshot) => {
          if (this.band) {
            console.log("Nueva alerta serca de ti!!!");
            this.localNotifications.schedule({
              id: 1,
              text: 'Nueva alerta cerca de ti!!!'
            });
          }
          this.band = true;
        });

      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
    //aqui es un cambio
  }


  motrar_modal() {
    let modal = this.modalCtrl.create("SubirPage", { "coords": { "lat": this.lat, "lon": this.lon } });
    modal.present();
  }

  motrar_modal2(events) {
    this.tempMarker.ver = true;
    this.tempMarker.lat = events.coords.lat;
    this.tempMarker.lon = events.coords.lng;
    this.actionSheetCtrl.create({
      // title:"Nueva Alerta",
      title: "¿Desea agregar una nueva alerta en este punto?",
      buttons: [{
        text: "Cancelar",
        role: 'cancel',
        handler: () => {
          this.tempMarker.ver = false;
        }
      }, {
        text: "Crear",
        handler: () => {
          let modal = this.modalCtrl.create("SubirPage", { "coords": { "lat": events.coords.lat, "lon": events.coords.lng } });
          modal.present();
          this.tempMarker.ver = false;
        }
      }]
    }).present()
    console.log(events);

    // let modal = this.modalCtrl.create("SubirPage",{"lat":events.lat});
    // modal.present();
  }

  motrar_ultimos() {
    let modal = this.modalCtrl.create(UltimosPage, { 'alertas': this.alertas });
    modal.onDidDismiss(data => {
      if (data) {
        this.lat = data.lat;
        this.lon = data.lon;
      }

    })
    modal.present();
  }


  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  logout() {
    this.navCtrl.setRoot(LoginPage).then(() => {
      this._login.logout();
    })
    //this._login.logout();
  }

  descripAlert(alerta: any) {
    console.log(alerta.tipo);
    this.navCtrl.push(DescripPage, { 'alerta': alerta });
  }

  llamar(tipo) {
    this.callNumber.callNumber(this.tiposAlertas[tipo].numero, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  ultimos() {
    let hoy = new Date();
    hoy.setDate(hoy.getDate() - 1)
    return hoy.getTime();
  }

}