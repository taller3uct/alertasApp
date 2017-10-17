import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DescripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-descrip',
  templateUrl: 'descrip.html',
})
export class DescripPage {
  alerta:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.alerta = this.navParams.get("alerta");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescripPage');
  }

}
