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
  public backgroundImage: any = "./assets/bg1.jpg";
  //imgLogo: any = "http:s//rfacturacion.remisse21.com.pe/public/app/medium_150.70391061453px_1202562_easyicon.net.png";
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

   
      
      /*this.userDataLogin.postData(userData, 'iniciarSesionCliente').then((response) => {
        me.responseData = response;
        if(response != false) {      
          window["plugins"].OneSignal
            .getIds(function(id) {
              var data = (
                'idusuario=' + me.responseData.idusuario +
                '&token=' + id.userId
              );

              me.userDataLogin.postData(data, 'actualizarTokenCliente').then((response) => {
                console.log(response);
              });
          });*/

          me.storage.set(me.HAS_LOGGED_IN, true);
          me.userDataLogin.setString('username', 'TEST');
          me.userDataLogin.setString('password', 'TEST');
          me.userDataLogin.setString('documento','TEST');
          me.userDataLogin.setString('imagen','TEST');
          me.userDataLogin.setString('nombres','TEST');
          me.userDataLogin.setString('email','TEST');
          me.userDataLogin.setInt('idpersona', 1);
          me.userDataLogin.setInt('idempresa',1);
          me.userDataLogin.setInt('estado',1);
          me.userDataLogin.setInt('idpermiso',1);
          me.userDataLogin.setInt('idusuario',1);
          me.userDataLogin.setString('nom_rol','TEST');
          me.userDataLogin.setString('permiso','TEST');
          me.events.publish('user:login');

            me.navCtrl.setRoot(AccountPage);
          
        /*} else {
          me.presentAlert();
        }
      });*/
    
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
