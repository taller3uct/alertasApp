import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home'

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usuario = {} as Usuario;
  clave2 = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private _login:LoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registrar(){
    if(this.usuario.clave = this.clave2){
      this._login.registrar(this.usuario).then(data=>{
        this.navCtrl.setRoot(HomePage);
      }).catch(error=>{
        console.error(error);
      });
      
    }
  }

}
