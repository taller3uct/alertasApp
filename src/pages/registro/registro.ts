import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../home/home'
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  formRegistro:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _login:LoginProvider) {
    this.formRegistro = new FormGroup({
      correo: new FormControl('',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      clave: new FormControl('',[Validators.required,Validators.minLength(6)]),
      clave2: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registrar(){
    if(this.formRegistro.valid){
      this._login.registrar(this.usuario).then(data=>{
        this.navCtrl.setRoot(HomePage);
      }).catch(error=>{
        console.error(error);
      });
      
    }
  }

}
