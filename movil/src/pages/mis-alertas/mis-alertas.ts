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

  constructor(public navCtrl: NavController, 
              private afDB: AngularFireDatabase, 
              private modalCtrl: ModalController, 
              private menuCtrl: MenuController, 
              private _login: LoginProvider,
              private pos: UbicacionProvider) {

    this._login.isLogin().then(res => {
      if (res) {
        this.alertas = afDB.list('/alertas',ref => ref.orderByChild('usuario').equalTo(_login.getUser())).valueChanges()
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
    //aqui es un cambio


  }

  motrar_modal() {
    let modal = this.modalCtrl.create("SubirPage");
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
    this.navCtrl.setRoot(LoginPage).then(()=>{
      this._login.logout();
    })
    //this._login.logout();
  }

  descripAlert(alerta: any) {
    console.log(alerta.tipo);
    this.navCtrl.push(DescripPage,{ 'alerta':alerta });
  }
}
