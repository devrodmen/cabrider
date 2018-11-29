import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PopoverController, IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ReservaClientePage } from '../../pages/reserva-cliente/reserva-cliente';
import { PopoverPage } from '../about-popover/about-popover';

import { Data } from '../../providers/data';
import { UserDataLogin } from '../../providers/user-data-login';
import { MapPage } from '../map/map/map';

@IonicPage()
@Component({
  selector: 'page-reserva',
  templateUrl: 'reserva.html'
})

export class ReservaPage {
  public fecha = new Date().toISOString();
  public hora = new Date().toISOString();
  public encargado = "";
  public gerencia = "";
  public centro = "";
  public pasajeros: any = [];
  /**
   * Parametros desde la página anterior
   */
  public origen = "";
  public origenexacto = "";
  public destino = "";
  public destinoexacto = "";
  public origlat = "";
  public origlon = "";
  public destlat = "";
  public destlon = "";
  public origenplaceid = "";
  public destinoplaceid = "";
  public direccion = "";
  public tipo = "";
  public permiso = "";
  public nombre = "";
  areas : any;
  tipopagos : any;
  tipovehiculos : any;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public popoverCtrl: PopoverController,
    public data: Data,
    public storage: Storage,
    public alertCtrl: AlertController,
    public userDataLogin: UserDataLogin,
  ) {
    //var areas = this.data.getDatos();
    this.data.getAreas()
    .map(res => res.json())
    .subscribe(res => {
      this.areas = res
    });

    this.data.getTipoPago()
    .map(res => res.json())
    .subscribe(res => {
      this.tipopagos = res
    });

    this.data.getTipoVehiculo()
    .map(res => res.json())
    .subscribe(res => {
      this.tipovehiculos = res
    });

    this.storage.get('permiso').then((permiso) => {
      this.permiso = permiso;
    });

    const datos = params.get('data');
    this.origen = datos.origen;
    this.origlat = datos.origenlat;
    this.origlon = datos.origenlon;
    this.origenplaceid = datos.origenplaceid;
    
    this.destino = datos.destino;
    this.origenexacto = datos.origenexacto;
    this.destinoexacto = datos.destinoexacto;
    this.destlat = datos.destinolat;
    this.destlon = datos.destinolon;
    this.destinoplaceid = datos.destinoplaceid;
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  ionViewDidLoad() {
    
  }

  grabar() {
    let me = this;
    me.confirmacion("Confirmación", "Está seguro que desea grabar el grupo?");
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

  prepararDatos() {
    let me = this;

    me.getIdUsuario().then(usuario => {
      me.getPermiso(usuario);
    });
  }

  getIdUsuario() {
    return this.userDataLogin.getInt("idusuario");
  }

  getPermiso(idusuario) {
    let me = this;
    me.getIdPermiso().then((idpermiso) => {
      me.sendDataReserva(idusuario, idpermiso);
    });
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
      "&direccion=" + me.direccion +
      "&tipo=" + me.tipo +
      "&idusuario=" + idusuario +
      "&idpermiso=" + idpermiso +
      "&nombre=" + me.nombre
    );

    me.data.registrarReserva(myData, me.pasajeros, "registrarGrupo").then((response) => {
      if(response["respuesta"] == true) {
        let alert = me.alertCtrl.create({
          title: "Correcto!",
          message: "Se grabó el grupo satisfactoriamente.",
          buttons: ['Ok']
        });
        alert.present();
        me.navCtrl.setRoot(MapPage);
        me.navCtrl.popToRoot();
      }
    });
  }

  getIdPermiso() {
    return this.userDataLogin.getInt("idpermiso");
  }
}
