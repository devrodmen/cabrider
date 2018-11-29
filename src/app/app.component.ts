import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform, ModalController, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map/map';
//import { TabsPage } from '../pages/tabs-page/tabs-page';
import { SchedulePage } from '../pages/schedule/schedule';
import { ActualizarInfoPage } from '../pages/actualizar-info/actualizar-info';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { CalificatePage } from '../pages/calificate/calificate';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { UserDataLogin } from '../providers/user-data-login';
import { Data } from '../providers/data';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  
  loggedInPages: PageInterface[] = [
    { title: 'Grupos', name: 'SchedulePage', component: SchedulePage, icon: 'car' },
    { title: 'Nuevo Grupo', name: 'MapPage', component: MapPage, icon: 'map' },
    { title: 'Perfil', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Cerrar Sesión', name: 'LoginPage', component: LoginPage, icon: 'log-out', logsOut: true }
  ];
  
  
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public userDataLogin: UserDataLogin,
    public data: Data,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
  ) {

    // Check if the user has already seen the tutorial
      this.storage.get('username').then((value) => {
        if(value != null) {
          this.storage.get('documento').then((documento) => {
            if(documento != null) {
              this.rootPage = AccountPage;
            } else {
              this.rootPage = ActualizarInfoPage;
            }
          });
        } else {
          this.rootPage = LoginPage;
        }
      });
    this.platformReady()

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let me = this;
    me.storage.get('username').then((value) => {
      if(value != null) {
        me.storage.get('documento').then((documento) => {
          if(documento != null) {
            if (page.logsOut === true) {
              me.userData.logout();
              me.rootPage = LoginPage;
            } else {
              me.rootPage = page.name;
            }
          } else {
            if (page.logsOut === true) {
              me.userData.logout();
              me.rootPage = LoginPage;
            } else {
              me.rootPage = ActualizarInfoPage;
            }
          }
        });
      } else {
        me.rootPage = LoginPage; 
      }
    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    let me = this;
    // Call any initial plugins when ready
    me.platform.ready().then(() => {
      me.splashScreen.hide();

      /*var notificationOpenedCallback = function(json) {
        let jsonData = json["notification"]["payload"]["additionalData"];
        let idreserva = jsonData["idreserva"];
        let datosRes = jsonData["datos"];
        let tipo = jsonData["tipo"];

        if(tipo == "asignar") {
          let obj = {
            datos: idreserva,
            data: datosRes
          };
          

          let modal = me.modalCtrl.create(ScheduleFilterPage, obj);
          modal.present();
        } else if (tipo == "llegada") {
          let alert = me.alertCtrl.create({
            title: "Su movil llegó",
            message: "Su movil acaba de llegar!",
            buttons: ['Ok']
          });
          alert.present();
        } else if (tipo == "anular") {
          
          let alert = me.alertCtrl.create({
            title: "Reserva rechazada",
            message: "No disponemos de unidades en este momento",
            buttons: ['Ok']
          });
          alert.present();
        } else if (tipo == "finalizar") {
          let modal = me.modalCtrl.create(CalificatePage, {idreserva: idreserva});
          modal.present();
        }
      };

      window["plugins"].OneSignal
        .startInit("5399e703-5c11-4c3e-b11d-075c9896b128", "955681932238")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();*/
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
