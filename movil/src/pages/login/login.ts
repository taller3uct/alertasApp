import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController } from 'ionic-angular';
//import { Usuario } from '../../models/usuario';
import { LoginProvider } from '../../providers/login/login';
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  estado = "";

  usuario;
  clave;

  imagen = "assets/img/iconoAlarma.png";

  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private _login:LoginProvider, private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {}

  login(){
    let loader = this.loadingCtrl.create({
      content: "Entrando..."
    });
    loader.present();
    this._login.login(this.usuario,this.clave).then(()=>{
      loader.dismiss();
      this.navCtrl.setRoot(HomePage);
    }).catch(()=>{
      loader.dismiss();
      this.estado = "La contraseña no es válida o el usuario no tiene una contraseña.";
    })
  }

  registrar(){
    this.modalCtrl.create(RegistroPage).present();
  }

}
