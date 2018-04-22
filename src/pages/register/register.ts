import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Data } from '../../providers/data';
import { UserDataLogin } from '../../providers/user-data-login';
import { LoginPage } from '../login/login';
import { FormGroup } from '@angular/forms/src/model';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage{
  myform: FormGroup;


  public tipocuenta = "";
  public email = "";
  public password = "";
  public usuario = "";
  public repassword = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public dataLogin: UserDataLogin,
    public alertController: AlertController
  ) {
    this.tipocuenta = this.navParams.get('tipocuenta');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  presentAlert(title, message) {
    let alert = this.alertController.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  registrar() {
    let me = this;

    if(me.password.length < 6) {
      me.presentAlert("Advertencia!", "La contraseña debe ser mayor de 6 carácteres.");
    }

    if(me.tipocuenta == "" || me.email == "" || me.password == "" || me.usuario == "") {
      me.presentAlert("Error!", "Debe llenar todos los campos");
    }
    
    if(me.tipocuenta != "" || me.email != "" || me.password != "" || me.usuario != "") {
      if(me.password == me.repassword) {
        let data = (
          "tipocuenta=" + me.tipocuenta + 
          "&email=" + me.email + 
          "&password=" + me.password + 
          "&usuario=" + me.usuario
        );
        me.data.getDataParam('registrarCliente', data).then((response) => {
          if(response == true) {
            me.presentAlert("Exito!", "Usuario registrado con éxito, confirme su registro ingresando a su correo.");
            me.navCtrl.setRoot(LoginPage);
          } else if (response == -1) {
            me.presentAlert("Error!", "Esta dirección de correo electrónico ya está siendo usada.");
          } else if (response == -2) {
            me.presentAlert("Error!", "Este usuario ya está en uso.");
          }
        });
      } else {
        me.presentAlert("Error!", "Las contraseñas deben coincidir");
      }
    }
  }

  nuevo() {
    let me = this;
    me.tipocuenta = "";
    me.email = "";
    me.password = "";
    me.repassword = "";
    me.usuario = "";
  }

}
