import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Data } from '../../providers/data';
import { UserDataLogin } from '../../providers/user-data-login';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ActualizarInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actualizar-info',
  templateUrl: 'actualizar-info.html',
})
export class ActualizarInfoPage {
  public idpermiso = "";
  public empresas = "";
  public nombres = "";
  public apellidos = "";
  public doi = "";
  public celular = "";
  public idusuario = "";
  public idempresa = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public data: Data,
    public userDataLogin: UserDataLogin,
    public alertCtrl: AlertController
  ) {
    this.storage.get('idpermiso').then((idpermiso) => {
      this.idpermiso = idpermiso;
    });

    this.storage.get('idusuario').then((idusuario) => {
      this.idusuario = idusuario;
    });

    this.data.getEmpresas()
    .map(res => res.json())
    .subscribe(res => {
      this.empresas = res
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualizarInfoPage');
  }

  actualizarInfo() {
    let me = this;
    let data = (
      "nombres=" + me.nombres +
      "&apellidos=" + me.apellidos +
      "&celular=" + me.celular +
      "&doi=" + me.doi +
      "&idusuario=" + me.idusuario +
      "&idempresa=" + me.idempresa
    );

    if(me.nombres != "" && me.apellidos != "" && me.celular != "" && me.doi != "" && me.idusuario != "") {
      me.data.getDataParam('actualizarInfo', data).then((response) => {
        if(response["respuesta"] == true) {
          let alert = this.alertCtrl.create({
            title: "Info",
            subTitle: "Es necesario volvr a iniciar sesión.",
            buttons: ['Ok']
          });
          alert.present();
          me.navCtrl.setRoot(LoginPage);
          me.userDataLogin.logout();
        }
      });
    }
  }
}
