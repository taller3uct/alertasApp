import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { CargaAlertaProvider } from '../providers/carga-alerta/carga-alerta';
import { IonicStorageModule } from "@ionic/storage";
//base de datos
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from "../config/firebase.config";
//mapa
import { AgmCoreModule } from '@agm/core';
//localizacion
import { Geolocation } from '@ionic-native/geolocation';



@NgModule({
  declarations: [
    MyApp,
    HomePage
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
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AjustesProvider,
    UbicacionProvider,
    CargaAlertaProvider,
    AngularFireDatabase,
    Geolocation
  ]
})
export class AppModule {
}
