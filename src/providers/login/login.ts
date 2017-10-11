import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Usuario } from '../../models/usuario';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  usuario:Usuario;

  constructor(private afAuth:AngularFireAuth) {
    console.log('Hello LoginProvider Provider');
  }

  isLogin(){
    const promesa = new Promise((resolve,recject)=>{
      const res = this.afAuth.authState.subscribe(data => {
        console.log(data);
        
        resolve(data && data.email && data.uid);
      });
    })
    return promesa;
  }

  login(usuario:Usuario){
    try {
      const res = this.afAuth.auth.signInWithEmailAndPassword(usuario.correo,usuario.clave);
      return res;
      
    } catch (error) {
      console.log(error);
    }
  }

  logout(){
    const res = this.afAuth.auth.signOut();
    return res;
  }

  registrar(usuario:Usuario){
    const res = this.afAuth.auth.createUserWithEmailAndPassword(usuario.correo,usuario.clave);
    return res;
  }

}
