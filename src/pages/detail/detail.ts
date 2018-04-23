import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Data } from '../../providers/data';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public person_image;
  public movil_image;
  datos: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public data: Data
  ) {
    let me = this;
    let idreserva = me.navParams.get('idreserva');
    let dataRes = me.navParams.get('dataRes');

    me.getReservaDetail(
      idreserva,
      dataRes
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  getReservaDetail(idreserva, dataRes) {
    let me = this;

    if(idreserva == null || idreserva == undefined) {
      me.datos = dataRes;
      me.person_image = "http://rfacturacion.remisse21.com.pe/public/personal/imagenes/" + me.datos.persona_imagen;
      me.movil_image = "http://rfacturacion.remisse21.com.pe/public/personal/imagenes/" + me.datos.movil_imagen;
    }

    me.data.getReservaDetail(idreserva).then((result) => {
      me.datos = result;
      me.person_image = "http://rfacturacion.remisse21.com.pe/public/personal/imagenes/" + me.datos.persona_imagen;
      me.movil_image = "http://rfacturacion.remisse21.com.pe/public/personal/imagenes/" + me.datos.movil_imagen;
    });
  }

  retroceder() {
    this.viewCtrl.dismiss();
  }

}
