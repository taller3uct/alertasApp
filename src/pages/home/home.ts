import { UltimosPage } from './../ultimos/ultimos';
import { Alerta } from './../../models/alerta';
import { UbicacionProvider } from './../../providers/ubicacion/ubicacion';
import { Component } from '@angular/core';
import { NavController, ModalController, MenuController, NavParams, AlertController } from 'ionic-angular';
import { SubirPage } from "../subir/subir";
import { LoginPage } from "../login/login";
import { DescripPage } from "../descrip/descrip";
import { CallNumber } from '@ionic-native/call-number';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { LoginProvider } from "../../providers/login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  alertas: Observable<Alerta[]>;
  posicion: Observable<Coordinates>;
  lat: number;
  lon: number;

  tiposAlertas = {
    "Policial":{
      "numero": "133",
      "nombre": "Carabineros"
    },
    "Ambulancia":{
      "numero": "131",
      "nombre": "Ambulancia"
    },
    "Incendio":{
      "numero": "132",
      "nombre": "Bomberos"
    }
  }

  constructor(public navCtrl: NavController, 
              private afDB: AngularFireDatabase, 
              private modalCtrl: ModalController, 
              private menuCtrl: MenuController, 
              private _login: LoginProvider,
              private pos: UbicacionProvider,
              private callNumber: CallNumber,
              private navParams: NavParams,
              private alertCtrl: AlertController) {
    this.posicion = this.pos.getPos().map(a=>{
      let coords = a.coords;
      return coords;
    })
    this.pos.iniciar_localizacion().then(data=>{
      this.lat = this.pos.latitud()
      this.lon = this.pos.longitud()
    })
    this._login.isLogin().then(res => {
      if (res) {
        this.alertas = afDB.list('/alertas',ref => ref.orderByChild('tiempo').startAt(this.ultimos())).valueChanges();
        
        
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
    //aqui es un cambio
  }


  motrar_modal() {
    let modal = this.modalCtrl.create("SubirPage",{"coords":{"lat":this.lat,"lon":this.lon}});
    modal.present();
  }

  motrar_modal2(events) {
    this.alertCtrl.create({
      title:"Nueva Alerta",
      message:"¿Desea agregar una nueva alerta en este punto?",
      buttons:[{
        text:"Cancelar"
      },{
        text:"Crear",
        handler:()=>{
          let modal = this.modalCtrl.create("SubirPage",{"coords":{"lat":events.coords.lat,"lon":events.coords.lng}});
          modal.present();
        }
      }]
    }).present()
    console.log(events);
    
    // let modal = this.modalCtrl.create("SubirPage",{"lat":events.lat});
    // modal.present();
  }

  motrar_ultimos() {
    let modal = this.modalCtrl.create(UltimosPage,{'alertas':this.alertas});
    modal.onDidDismiss(data => {
      if (data){
        this.lat = data.lat;
        this.lon = data.lon;
      }
      
    })
    modal.present();
  }

  mostrar_fecha(num: any) {
    let Nfecha = new Date(num)
    let dia = ""
    let mes = ""

    if (Nfecha.getDay() == 1) {
      dia = "Lunes "
    } else if (Nfecha.getDay() == 2) {
      dia = "Martes "
    } else if (Nfecha.getDay() == 3) {
      dia = "Miercoles "
    } else if (Nfecha.getDay() == 4) {
      dia = "Jueves "
    } else if (Nfecha.getDay() == 5) {
      dia = "Viernes "
    } else if (Nfecha.getDay() == 6) {
      dia = "Sabado "
    } else if (Nfecha.getDay() == 7) {
      dia = "Domingo "
    }
    if (Nfecha.getMonth() == 0) {
      mes = " Enero, "
    } else if (Nfecha.getMonth() == 1) {
      mes = " Febrero, "
    } else if (Nfecha.getMonth() == 2) {
      mes = " Marzo, "
    } else if (Nfecha.getMonth() == 3) {
      mes = " Abril, "
    } else if (Nfecha.getMonth() == 4) {
      mes = " Mayo, "
    } else if (Nfecha.getMonth() == 5) {
      mes = " Junio, "
    } else if (Nfecha.getMonth() == 6) {
      mes = " Julio, "
    } else if (Nfecha.getMonth() == 7) {
      mes = " Agosto, "
    } else if (Nfecha.getMonth() == 8) {
      mes = " Septiembre, "
    } else if (Nfecha.getMonth() == 9) {
      mes = " Octubre, "
    } else if (Nfecha.getMonth() == 10) {
      mes = " Noviembre, "
    } else if (Nfecha.getMonth() == 11) {
      mes = " Diciembre, "
    }


    return dia + Nfecha.getDate() + mes + Nfecha.getFullYear() + ", " + Nfecha.toLocaleTimeString();
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

  logout() {
    this.navCtrl.setRoot(LoginPage).then(()=>{
      this._login.logout();
    })
    //this._login.logout();
  }

  descripAlert(alerta: any) {
    console.log(alerta.tipo);
    this.navCtrl.push(DescripPage,{ 'alerta':alerta });
  }

  llamar(tipo){
    this.callNumber.callNumber(this.tiposAlertas[tipo].numero, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  ultimos(){
    let hoy = new Date();
    hoy.setDate(hoy.getDate()-1)
    return hoy.getTime();
  }

}