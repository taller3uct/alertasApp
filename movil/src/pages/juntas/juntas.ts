import { DbProvider } from './../../providers/db/db';
import { DescripPage } from './../descrip/descrip';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DescripJvPage } from "../descrip-jv/descrip-jv";

/**
 * Generated class for the JuntasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-juntas',
  templateUrl: 'juntas.html',
})
export class JuntasPage {
  juntas: Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,  private afDB: AngularFireDatabase, private db: DbProvider) {
    this.juntas = this.db.getJuntas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuntasPage');
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
  descripjjvv(junta: any) {
    this.navCtrl.push(DescripJvPage,{ 'junta':junta });
  }

}
