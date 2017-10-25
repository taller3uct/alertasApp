import { MostrarFechaPipe } from './../pipes/mostrar-fecha/mostrar-fecha';
import { UltimosPage } from './../pages/ultimos/ultimos';
import { MisAlertasPage } from './../pages/mis-alertas/mis-alertas';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { CargaAlertaProvider } from '../providers/carga-alerta/carga-alerta';
import { IonicStorageModule } from "@ionic/storage";
import { DescripPage } from "../pages/descrip/descrip";
import { JuntasPage } from "../pages/juntas/juntas";
//base de datos
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from "../config/firebase.config";
//mapa
import { AgmCoreModule } from '@agm/core';
//localizacion
import { Geolocation } from '@ionic-native/geolocation';
import { LoginProvider } from '../providers/login/login';

import { CallNumber } from '@ionic-native/call-number';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    DescripPage,
    JuntasPage,
    MisAlertasPage,
    UltimosPage,
    MostrarFechaPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBV2Y9ttsqqvbPEsHpizSelrYW-d9-bhVE'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    DescripPage,
    JuntasPage,
    MisAlertasPage,
    UltimosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AjustesProvider,
    UbicacionProvider,
    CargaAlertaProvider,
    AngularFireDatabase,
    Geolocation,
    LoginProvider,
    CallNumber
  ]
})
export class AppModule {
}
