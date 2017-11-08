import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/subject';
import { Usuario } from '../../models/usuario';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  usuarioSubject = new Subject()

  usuario = {} as {correo:string, uid:string};
  logeado;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.auth.setPersistence("local");
    this.logeado = this.afAuth.authState.subscribe(data => {
      if (data) {
        this.usuario.uid = data.uid;
        this.usuario.correo = data.email;
      }
    })
  }

  isLogin() {
    return new Promise((resolve, recject) => {
      this.afAuth.authState.subscribe(data => {
        resolve(data && data.email && data.uid);
      });
    })
  }

  login(usuario, clave) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(usuario, clave).then(data=>{
        this.usuario.correo = data.email;
        this.usuario.uid = data.uid;
        
        resolve();
      }).catch(()=>reject())
    })
    // try {
    //   const res = this.afAuth.auth.signInWithEmailAndPassword(usuario.correo, usuario.clave).;
    //   return res;

    // } catch (error) {
    //   console.log(error);
    // }
  }

  logout() {
    this.logeado.unsubscribe();
    const res = this.afAuth.auth.signOut();
    return res;
  }

  registrar(usuario: Usuario,clave) {
    const res = this.afAuth.auth.createUserWithEmailAndPassword(usuario.correo, clave);
    return res;
  }

  getUser() {
    return this.usuario;
  }

}
