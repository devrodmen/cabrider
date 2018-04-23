import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

import { NavController, Events, AlertController } from 'ionic-angular';

import { UserDataLogin } from '../../providers/user-data-login';
import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

//import { TabsPage } from '../tabs-page/tabs-page';
import { AccountPage } from '../account/account';
import { RegisterPage } from '../register/register';
import { ActualizarInfoPage } from '../actualizar-info/actualizar-info';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  /*tabBarElement: any;
  splash = true;*/

  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  responseData : any;
  loginForm: any;
  public backgroundImage: any = "http://rfacturacion.remisse21.com.pe/public/app/bg1.jpg";
  imgLogo: any = "http://rfacturacion.remisse21.com.pe/public/app/medium_150.70391061453px_1202562_easyicon.net.png";
  errorMessage: String;
  login: UserOptions = { username: '', password: '', imagen: '',idpersona: '',permiso:'',nombres:'',email:'',estado: '',nombrerol: '',dni:'' };
  submitted = false;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public alertController: AlertController,
    public userData: UserData,
    public userDataLogin: UserDataLogin,
    public storage: Storage
  ) {
    //this.tabBarElement = document.querySelector('.tabbar');
  }

  /*ionViewDidLoad() {
    let me = this;
    me.tabBarElement.style.display = 'none';
    setTimeout(() => {
      me.splash = false;
      me.tabBarElement.style.display = 'flex';
    }, 4000);
  }*/

  onLogin(form: NgForm) {
    this.submitted = true;
    let me = this;

    if (form.valid) {
      var userData = (
        'usuario=' + this.login.username +
        '&clave=' + this.login.password
      );
      
      this.userDataLogin.postData(userData, 'iniciarSesionCliente').then((response) => {
        me.responseData = response;
        if(response != false) {
          
          /*var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          };
      
          window["plugins"].OneSignal
            .startInit("5399e703-5c11-4c3e-b11d-075c9896b128", "955681932238")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();*/
      
          window["plugins"].OneSignal
            .getIds(function(id) {
              var data = (
                'idusuario=' + me.responseData.idusuario +
                '&token=' + id.userId
              );

              me.userDataLogin.postData(data, 'actualizarTokenCliente').then((response) => {
                console.log(response);
              });
          });

          me.storage.set(me.HAS_LOGGED_IN, true);
          me.userDataLogin.setString('username', me.login.username);
          me.userDataLogin.setString('password', me.login.password);
          me.userDataLogin.setString('documento',me.responseData.dni);
          me.userDataLogin.setString('imagen',me.responseData.imagen);
          me.userDataLogin.setString('nombres',me.responseData.nombapel);
          me.userDataLogin.setString('email',me.responseData.email);
          me.userDataLogin.setInt('idpersona',me.responseData.idpersona);
          me.userDataLogin.setInt('idempresa',me.responseData.idempresa);
          me.userDataLogin.setInt('estado',me.responseData.estado);
          me.userDataLogin.setInt('idpermiso',me.responseData.permiso);
          me.userDataLogin.setInt('idusuario',me.responseData.idusuario);
          me.userDataLogin.setString('nom_rol',me.responseData.nom_rol);
          me.userDataLogin.setString('permiso',me.responseData.permiso);
          me.events.publish('user:login');
          if(me.responseData.dni == null) {
            me.navCtrl.setRoot(ActualizarInfoPage);
          } else {
            me.navCtrl.setRoot(AccountPage);
          }
        } else {
          me.presentAlert();
        }
      });
    }
  }

  onSignup(type) {
    this.navCtrl.setRoot(RegisterPage, {tipocuenta: type});
  }

  presentAlert() {
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: 'Usuario o contraseña incorrectos',
      buttons: ['Ok']
    });
    alert.present();
  }
}
