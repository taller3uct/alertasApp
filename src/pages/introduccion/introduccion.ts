import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AjustesProvider } from "../../providers/ajustes/ajustes";

/**
 * Generated class for the IntroduccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

  slides:any[] = [
    {
      title: "Bienvenido!!!",
      description: "<b>Barrio Seguro</b> te ayudara a reportar emergencias en tu junta de vecinos promoviendo la seguridad!",
      image: "assets/img/info.png",
    },
    {
      title: "Marcha blanca",
      description: "<b>Barrio Seguro</b> esta en marcha blanca, por lo que solo funcionara en el pueblo de cunco.",
      image: "assets/img/map.png",
    },
    {
      title: "Cuidado!!!",
      description: "Esta aplicación no es para jugar, cualquier mal comportamiento sera reportado a las autoridades!",
      image: "assets/img/emergencia.png",
    }
  ];
  
  
    constructor(public navCtrl: NavController, private _ajustes: AjustesProvider) {
    }
  
    saltar_tutorial(){
      this._ajustes.ajustes.mostrar_tutorial = false;
      this._ajustes.guardar_storage();
  
      this.navCtrl.setRoot( HomePage );
  
    }
  

}
