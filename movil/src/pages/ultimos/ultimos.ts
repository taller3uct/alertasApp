import { ViewController } from 'ionic-angular';
import { Alerta } from './../../models/alerta';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/**
 * Generated class for the UltimosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ultimos',
  templateUrl: 'ultimos.html',
})
export class UltimosPage {
  alertas:Observable<Alerta[]>

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.alertas = this.navParams.get("alertas");
  }

  ionViewDidLoad() {
  }
  volver(alerta:Alerta){
    this.viewCtrl.dismiss({'lat':alerta.lat, 'lon':alerta.lon});
    
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

}
