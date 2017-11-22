//import { MyApp } from './../../app/app.component';
import { Usuario } from './../../models/usuario';
import { Alerta } from './../../models/alerta';
//import { LoginPage } from './../../pages/login/login';
import { LoginProvider } from './../login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

@Injectable()
export class DbProvider {

  constructor(private afDB: AngularFireDatabase, 
              private login: LoginProvider, 
              localNotifications: LocalNotifications, 
              backgroundMode: BackgroundMode) {
    backgroundMode.enable();
    backgroundMode.setDefaults({silent: true})  
    backgroundMode.overrideBackButton(); 
    let band = false;
    login.isLogin().then(res => {
      if (res){
        this.afDB.database.ref('/alertas').on('value', (a,b) => {
          if (band) {
            localNotifications.schedule({
              id: 1,
              text: 'Nueva alerta cerca de ti!!!'
            });
          }
          band = true;
        });
      }
    })
   
  }

  getAlertas(){
    return this.afDB.list<Alerta>('/alertas', ref => ref.orderByChild('tiempo').startAt(this.ultimos())).valueChanges();
  }

  getAlertasUsuario(){
    return this.afDB.list('/alertas',ref => ref.orderByChild('usuario').equalTo(this.login.getUser().uid)).valueChanges(); 
  }

  getJuntas(){
    return this.afDB.list('/juntas').valueChanges();
  }

  nuevoUsuario(usuario,uid){
    return this.afDB.database.ref('usuarios/' + uid).set(usuario);
  }

  getUsuario(){
    return new Promise((resolve,reject)=>{
      this.afDB.database.ref('usuarios/' + this.login.usuario.uid).once('value').then((data)=>{
        resolve(data.val() as Usuario)
      })
    }) 
  }

  ultimos() {
    let hoy = new Date();
    hoy.setDate(hoy.getDate() - 1)
    return hoy.getTime();
  }

  nuevaAlerta(alerta){
    return this.afDB.database.ref('/alertas').push( alerta );
  }

  getJuntaUsuario(){
    return new Promise((resolve,reject)=>{
      this.getUsuario().then(usuario => {
        const user = usuario as Usuario
        resolve(user.juntaVecino)
      })
    });
  }

  setUsuario() {
    this.getUsuario().then(usuario=>{
      const user = usuario as Usuario;
      this.login.usuarioSubject.next(user)
    })
  }

}
