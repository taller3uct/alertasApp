import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViewController } from "ionic-angular";
import { CargaAlertaProvider } from "../../providers/carga-alerta/carga-alerta";
import { UbicacionProvider } from "../../providers/ubicacion/ubicacion";

/**
 * Generated class for the SubirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  tipo:string = "Policial";
  descripcion:string = "";

  constructor(private viewCtrl: ViewController, private _cas:CargaAlertaProvider, private loadingCtrl:LoadingController, private _ubicacion:UbicacionProvider) {
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  subir_alerta(){
    console.log("subiendo alerta....");
    let loader = this.loadingCtrl.create({
      content: "subiendo alerta..."
    });
    loader.present();
    this._ubicacion.iniciar_localizacion().then(()=>{
      this._cas.cargar_alerta(this.tipo,this.descripcion,this._ubicacion.latitud(),this._ubicacion.longitud()).then(()=>{
        console.log("sali");
        loader.dismiss();
        this.cerrar_modal();
      },(error)=>{
        loader.dismiss();
        console.log("error al cargar " + error);
      });
    });
  }

}
