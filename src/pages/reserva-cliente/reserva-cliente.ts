import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AddPersonalPage } from '../../pages/add-personal/add-personal';
import { Storage } from '@ionic/storage';

import { Data } from '../../providers/data';
import { UserDataLogin } from '../../providers/user-data-login';
import { MapPage } from '../map/map/map';

@IonicPage()
@Component({
  selector: 'page-reserva-cliente',
  templateUrl: 'reserva-cliente.html',
})
export class ReservaClientePage {

  rootPage : any = MapPage;

  public nombres = "";
  public dni = "";
  /**
   * Parametros desde la página anterior
   */
  public fecha;
  public personales: any;
  public pasajeros: any = [];
  public nompas: any = [{}];
  public pasajero;
  public hora;
  public encargado;
  public observacion;
  public gerencia;
  public centro;
  public origen;
  public origenexacto;
  public destino;
  public destinoexacto;
  public origlat;
  public origlon;
  public destlat;
  public destlon;
  public origenplaceid;
  public destinoplaceid;
  public tipopago;
  public modelo;
  public permiso = "";

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public modal: ModalController,
    public data: Data,
    public alertCtrl: AlertController,
    public userDataLogin: UserDataLogin,
    public storage: Storage,
    public app: App
  ) {

    this.storage.get('permiso').then((permiso) => {
      this.permiso = permiso;
    });

    const datos = params.get('data');
    this.fecha = datos.fecha;
    this.hora = datos.hora;
    this.encargado = datos.encargado;
    this.gerencia = datos.gerencia;
    this.centro = datos.centro;
    this.origen = datos.origen;
    this.origenexacto = datos.origenexacto;
    this.destinoexacto = datos.destinoexacto;
    this.destino = datos.destino;
    this.origlat = datos.origenlat;
    this.origlon = datos.origenlon;
    this.destlat = datos.destinolat;
    this.destlon = datos.destinolon;
    this.origenplaceid = datos.origenplaceid;
    this.destinoplaceid = datos.destinoplaceid;
    this.tipopago = datos.tipopago;
    this.modelo = datos.modelo;
    this.observacion = datos.observacion;
  }

  ionViewDidLoad() {
    let me = this;
    me.updatePersonal();
  }

  continuar() {
    let me = this;
    me.confirmacion("Confirmación", "Está seguro que desea realizar la reserva?");
  }

  /**
   * Agregar pasajero
   */
  agregarPasajero() {
    let me = this;
    let cont;
      let nom = me.pasajero.split("-");
      me.nompas.push(
        {
          nombre: nom[1]
        }
      );

      cont = me.pasajeros.length;
      me.pasajeros[cont] = nom[0];
      me.cambiarValorSelect();
  }

  cambiarValorSelect() {
    let me = this;
    me.pasajero = "-1";
  }

  addPersonal() {
    let me = this;
    const AddPersonal = this.modal.create(AddPersonalPage);
    AddPersonal.present();

    AddPersonal.onDidDismiss((data) => {
      console.log(data);
      me.updatePersonal();
    });
  }

  updatePersonal() {
    let me = this;
    me.getIdEmpresa().then((idempresa) => {
      console.log(idempresa);
      me.data.getPersonales(idempresa).then((res) => {
        me.personales = res;
      });
    });
  }

  getIdEmpresa() {
    return this.userDataLogin.getInt('idempresa');
  }

  alert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  confirmacion(title, message) {
    let me = this;
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            me.prepararDatos();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  getIdUsuario() {
    return this.userDataLogin.getInt("idusuario");
  }

  sendDataReserva(idusuario, idpermiso){
    let me = this;
    let myData = (
      "fecha=" + me.fecha +
      "&hora=" + me.hora +
      "&encargado=" + me.encargado +
      "&gerencia=" + me.gerencia +
      "&centro=" + me.centro +
      "&origen=" + me.origen +
      "&origenexacto=" + me.origenexacto +
      "&destino=" + me.destino +
      "&destinoexacto=" + me.destinoexacto +
      "&origlat=" + me.origlat +
      "&origlon=" + me.origlon +
      "&destlat=" + me.destlat +
      "&destlon=" + me.destlon +
      "&origenplaceid=" + me.origenplaceid +
      "&destinoplaceid=" + me.destinoplaceid +
      "&tipopago=" + me.tipopago +
      "&modelo=" + me.modelo +
      "&idusuario=" + idusuario +
      "&idpermiso=" + idpermiso +
      "&observacion=" + me.observacion
    );

    me.data.registrarReserva(myData, me.pasajeros, "registrarReserva").then((response) => {
      if(response["respuesta"] == true) {
        let alert = me.alertCtrl.create({
          title: "Correcto!",
          message: "Se registró su reserva satisfactoriamente.",
          buttons: ['Ok']
        });
        alert.present();
        me.navCtrl.setRoot(MapPage);
        me.navCtrl.popToRoot();
      }
    });
  }

  getPermiso(idusuario) {
    let me = this;
    me.getIdPermiso().then((idpermiso) => {
      me.sendDataReserva(idusuario, idpermiso);
    });
  }

  getIdPermiso() {
    return this.userDataLogin.getInt("idpermiso");
  }

  prepararDatos() {
    let me = this;
    /*let idpermiso;
    let myData;*/

    me.getIdUsuario().then(usuario => {
      me.getPermiso(usuario);
    });
  }
}
