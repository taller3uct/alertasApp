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
  lat:number;
  lon:number;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private _cas:CargaAlertaProvider, private loadingCtrl:LoadingController, private _ubicacion:UbicacionProvider) {
    let coords = this.navParams.get("coords");
    console.log(coords);
    
    this.lat = coords.lat;
    this.lon = coords.lon;
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
    this._cas.cargar_alerta(this.tipo,this.descripcion,this.lat,this.lon).then(()=>{
      console.log("sali");
      loader.dismiss();
      this.cerrar_modal();
    },(error)=>{
      loader.dismiss();
      console.error("error al cargar " + error);
    });
  }

}
