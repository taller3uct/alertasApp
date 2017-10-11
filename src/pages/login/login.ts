import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  usuario = {} as Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _login:LoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(usuario:Usuario){
    if(this._login.login(usuario)){
      this.navCtrl.setRoot(HomePage);
    } 
  }

  registrar(){
    this.navCtrl.push(RegistroPage)
  }

}
