import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DescripJvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-descrip-jv',
  templateUrl: 'descrip-jv.html',
})
export class DescripJvPage {

  junta:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.junta = this.navParams.get("junta");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescripJvPage');
  }

}
