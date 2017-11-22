import { TipoAlertaPipe } from './../pipes/tipo-alerta/tipo-alerta';
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
import { DescripJvPage } from "../pages/descrip-jv/descrip-jv";
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
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LOCALE_ID } from "@angular/core";
import { DbProvider } from '../providers/db/db';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    DescripPage,
    JuntasPage,
    DescripJvPage,
    MisAlertasPage,
    UltimosPage,
    MostrarFechaPipe,
    TipoAlertaPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atras'
    }),
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
    DescripJvPage,
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
    LocalNotifications,
    BackgroundMode,
    CallNumber, { provide: LOCALE_ID, useValue: "es" },
    DbProvider,
    ScreenOrientation
  ]
})
export class AppModule {
}
