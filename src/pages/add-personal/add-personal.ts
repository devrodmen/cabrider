import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ViewController } from 'ionic-angular';

import { Data } from '../../providers/data';
import { UserDataLogin } from '../../providers/user-data-login';

@IonicPage()
@Component({
  selector: 'page-add-personal',
  templateUrl: 'add-personal.html',
})
export class AddPersonalPage {
  public nombres;
  public dni;
  public celular;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public userDataLogin: UserDataLogin,
    public alertCtrl: AlertController,
    public view: ViewController
  ) {
    this.nombres = '';
    this.dni = '';
    this.celular = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonalPage');
  }

  getIdEmpresa() {
    return this.userDataLogin.getInt('idempresa');
  }

  guardarPersonal() {
    let me = this;
    if(me.nombres == "" || me.dni == "") {
      me.confirmacion("Error", "Debe ingresar nombres y apellidos", null);
    } else {
      me.getIdEmpresa().then((idempresa) => {
        let data = (
          'nombres=' + me.nombres +
          '&dni=' + me.dni +
          '&idempresa=' + idempresa +
          '&celular=' + me.celular
        );

        me.data.addPersonal(data,'addPersonal').then((res) => {
          console.log(res)
          if(res == true) {
            me.confirmacion("Exito", "Pasajero ingresado satisfactoriamente", 1);
          } else {
            me.confirmacion("Error", "Ocurrió un error cuando intentaba registral un nuevo pasajero", 2);
          }
        });
      });
    }
  }

  confirmacion(title, message, tipo) {
    let me = this;
    if(tipo != null) {
      if(tipo == 1) {
        me.nombres = '';
        me.dni = '';
      }
    }

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  regresar() {
    this.view.dismiss();
  }

}
