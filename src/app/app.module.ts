import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { AutocompletePage } from '../pages/map/autocomplete/autocomplete';
import { AutocompleteDestinoPage } from '../pages/map/autocomplete-destino/autocomplete-destino';
import { ReservaPage } from '../pages/reserva/reserva';
import { ReservaClientePage } from '../pages/reserva-cliente/reserva-cliente';
import { AddPersonalPage } from '../pages/add-personal/add-personal';
import { RegisterPage } from '../pages/register/register';
import { ActualizarInfoPage } from '../pages/actualizar-info/actualizar-info';
import { CalificatePage } from '../pages/calificate/calificate';
import { DetailPage } from '../pages/detail/detail';

import { IonRating } from '../components/ion-rating/ion-rating';

/**
 * Angular Fire
 */

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { UserDataLogin } from '../providers/user-data-login';
import { Data } from '../providers/data';
/*import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { AuthProvider } from '../providers/auth/auth';*/

/**
 * Servicios
 */
import { ReservaService } from '../services/reservas.service';
import { CordsProvider } from '../providers/cords/cords';

export const firebaseConfig = {
  apiKey: "AIzaSyCWnsuUCQxGOVoKjtY4hnWPWHtWUab6PXw",
  authDomain: "remisse21.firebaseapp.com",
  databaseURL: "https://remisse21.firebaseio.com",
  storageBucket: "remisse21.appspot.com",
  messagingSenderId: '895017330649'
};

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage,
    AutocompletePage,
    AutocompleteDestinoPage,
    ReservaPage,
    ReservaClientePage,
    AddPersonalPage,
    RegisterPage,
    ActualizarInfoPage,
    CalificatePage,
    DetailPage,
    IonRating
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: ReservaPage, name: 'ReservaPage', segment: 'reserva-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: MapPage, name: 'MapPage', segment: 'map-page' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' }
      ]
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage,
    AutocompletePage,
    AutocompleteDestinoPage,
    ReservaPage,
    ReservaClientePage,
    AddPersonalPage,
    RegisterPage,
    ActualizarInfoPage,
    CalificatePage,
    DetailPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    Data,
    UserDataLogin,
    InAppBrowser,
    SplashScreen,
    /*FirebaseDbProvider,
    AuthProvider,*/
    ReservaService,
    CordsProvider,
    FileTransfer,
    //FileUploadOptions,
    FileTransferObject,
    File,
    Camera
  ]
})
export class AppModule { }
