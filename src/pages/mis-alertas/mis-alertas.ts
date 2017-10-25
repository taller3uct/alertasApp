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

  mostrar_fecha(num: any) {
    let Nfecha = new Date(num)
    let dia = ""
    let mes = ""

    if (Nfecha.getDay() == 1) {
      dia = "Lunes "
    } else if (Nfecha.getDay() == 2) {
      dia = "Martes "
    } else if (Nfecha.getDay() == 3) {
      dia = "Miercoles "
    } else if (Nfecha.getDay() == 4) {
      dia = "Jueves "
    } else if (Nfecha.getDay() == 5) {
      dia = "Viernes "
    } else if (Nfecha.getDay() == 6) {
      dia = "Sabado "
    } else if (Nfecha.getDay() == 7) {
      dia = "Domingo "
    }
    if (Nfecha.getMonth() == 0) {
      mes = " Enero, "
    } else if (Nfecha.getMonth() == 1) {
      mes = " Febrero, "
    } else if (Nfecha.getMonth() == 2) {
      mes = " Marzo, "
    } else if (Nfecha.getMonth() == 3) {
      mes = " Abril, "
    } else if (Nfecha.getMonth() == 4) {
      mes = " Mayo, "
    } else if (Nfecha.getMonth() == 5) {
      mes = " Junio, "
    } else if (Nfecha.getMonth() == 6) {
      mes = " Julio, "
    } else if (Nfecha.getMonth() == 7) {
      mes = " Agosto, "
    } else if (Nfecha.getMonth() == 8) {
      mes = " Septiembre, "
    } else if (Nfecha.getMonth() == 9) {
      mes = " Octubre, "
    } else if (Nfecha.getMonth() == 10) {
      mes = " Noviembre, "
    } else if (Nfecha.getMonth() == 11) {
      mes = " Diciembre, "
    }


    return dia + Nfecha.getDate() + mes + Nfecha.getFullYear() + ", " + Nfecha.toLocaleTimeString();
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
