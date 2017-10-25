import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LoginProvider } from "../../providers/login/login";
import { DescripPage } from "../descrip/descrip";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,  private afDB: AngularFireDatabase, private _login: LoginProvider) {
    this._login.isLogin().then(res => {
      if (res) {
        this.juntas = afDB.list('/juntas').valueChanges();
      }
    });
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
    console.log(junta.nombre);
    this.navCtrl.push(DescripPage,{ 'junta':junta });
  }

}
