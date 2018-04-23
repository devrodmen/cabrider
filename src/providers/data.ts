import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Events, AlertController,  ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AccountPage } from '../pages/account/account';

import { UserDataLogin } from '../providers/user-data-login';

let apiUrl = 'http://rfacturacion.remisse21.com.pe/apk/';

@Injectable()
export class Data {
  responseData : any;

  constructor(
    public events: Events,
    public storage: Storage,
    public http: Http,
    public userDataLogin: UserDataLogin,
    public alertCtrl: AlertController,
    
    public modal: ModalController
  ) {}

  /**
   * Devolver    de la api
   */

  getPersonales(idempresa) {
    let data = (
      'idempresa=' + idempresa
    );
    return this.getDataParam('getPersonales', data);
  }

  getReservas(idusuario) {
    let data = (
      'idusuario=' + idusuario
    );
    return this.getDataParam('getReservas', data);
  }

  getReservaDetail(idreserva) {
    let data = (
      'idreserva=' + idreserva
    );
    return this.getDataParam('getReservaDetail', data);
  }
  
  getAreas() {
    return this.getData('getAreas');
  };

  getTipoPago() {
    return this.getData('getTipoPago');
  }

  getTipoVehiculo() {
    return this.getData('getTipoVehiculo');
  }

  getEmpresas() {
    return this.getData('getEmpresas');
  }

  getData(method) {
    return this.http.get(apiUrl + method); 
  }

  getCalificate(method, data) {
    return this.getDataParam('getCalificate', data);
  }

  getDataParam(method, data) {    
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    });
    let options = new RequestOptions({
        headers: headers
    });

    return new Promise((resolve, reject) => {
        headers = new Headers();
        this.http.post(apiUrl + method, data, options)
            .subscribe(res => {
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
    });
  }

  addPersonal(data, method) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    });
    let options = new RequestOptions({
        headers: headers
    });

    return new Promise((resolve, reject) => {
      headers = new Headers();
      this.http.post(apiUrl + method, data, options)
          .subscribe(res => {
              resolve(res.json());
          }, (err) => {
              reject(err);
          });
    });
  }

  registrarReserva(data, personal, method) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    });
    let options = new RequestOptions({
        headers: headers
    });

    return new Promise((resolve, reject) => {
      headers = new Headers();
      this.http.post(apiUrl + method, data + "&personal=" + personal, options)
          .subscribe(res => {
              resolve(res.json());
          }, (err) => {
              reject(err);
          });
    });
  }

  redireccionar() {
    const Account = this.modal.create(AccountPage);
    Account.present();    
  }

  alert(title, message) {
    let me = this;
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          me.redireccionar();
        }
      }]
    });
    alert.present();
  }
}
