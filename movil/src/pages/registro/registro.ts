import { Usuario } from './../../models/usuario';
import { ViewController, LoadingController } from 'ionic-angular';
import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  clave1 = '';
  clave2 = '';
  juntas;

  constructor(public navCtrl: NavController, private _login:LoginProvider, private db: DbProvider, public view: ViewController, private loader: LoadingController) {
    this.juntas = this.db.getJuntas();
  }

  registrar(){
    if(this.clave1 = this.clave2){
      const loader = this.loader.create({
        content:"Registrando..."
      });
      loader.present();
      this._login.registrar(this.usuario,this.clave1).then(data=>{
        this.db.nuevoUsuario(this.usuario,data.uid).then(()=>{
          loader.dismiss();
          this.navCtrl.setRoot(HomePage);
        })
        
      }).catch(error=>{
        console.error(error);
      });
      
    }
  }

}
