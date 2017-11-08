import { DbProvider } from './../../providers/db/db';
import { DescripPage } from './../descrip/descrip';
import { LoginPage } from './../login/login';
import { UbicacionProvider } from './../../providers/ubicacion/ubicacion';
import { LoginProvider } from './../../providers/login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { Geoposition } from '@ionic-native/geolocation';
import { Alerta } from './../../models/alerta';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, MenuController } from 'ionic-angular';

/**
 * Generated class for the MisAlertasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mis-alertas',
  templateUrl: 'mis-alertas.html',
})
export class MisAlertasPage {

  alertas: Observable<Alerta[]>;
  lat;
  lon;

  constructor(public navCtrl: NavController, 
              private afDB: AngularFireDatabase, 
              private modalCtrl: ModalController, 
              private menuCtrl: MenuController, 
              private db: DbProvider,
              private pos: UbicacionProvider) {

    this.pos.iniciar_localizacion().then(data => {
      this.lat = this.pos.latitud()
      this.lon = this.pos.longitud()
    })
  }

  ionViewDidLoad() {
    this.alertas = this.db.getAlertasUsuario() as Observable<Alerta[]>;
  }

  

  motrar_modal() {
    let modal = this.modalCtrl.create("SubirPage",{ "coords": { "lat": this.lat, "lon": this.lon } });
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

  

  descripAlert(alerta: any) {
    this.navCtrl.push(DescripPage,{ 'alerta':alerta });
  }
}
