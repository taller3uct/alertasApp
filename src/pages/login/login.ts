import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
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

  usuario = {} as Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _login:LoginProvider, private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let loader = this.loadingCtrl.create({
      content: "Entrando..."
    });
    loader.present();
    this._login.login(this.usuario).then(data=>{
      this._login.obsUid();
      loader.dismiss();
      this.navCtrl.setRoot(HomePage);
    }).catch(error=>{
      loader.dismiss();
      console.error(error)
      this.estado = "La contraseña no es válida o el usuario no tiene una contraseña.";
    })
  }

  registrar(){
    this.navCtrl.push(RegistroPage)
  }

}
