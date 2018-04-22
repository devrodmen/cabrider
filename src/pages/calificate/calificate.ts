import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Data } from '../../providers/data';

import { MapPage } from '../../pages/map/map/map';
import { SchedulePage } from '../../pages/schedule/schedule';

/**
 * Generated class for the CalificatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calificate',
  templateUrl: 'calificate.html',
})
export class CalificatePage {
  public idreserva = "";
  public observacion = "";
  public rating = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: Data,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) {
    this.idreserva = this.navParams.get('idreserva');
  }

  log(valor) {
    this.rating = valor;
    console.log(valor);
  }

  calificar() {
    let me = this;
    let data = (
      "idreserva=" + me.idreserva +
      "&observacion=" + me.observacion +
      "&rating=" + me.rating
    );

    me.data.getCalificate("getCalificate", data).then((response) => {
      if(response == true) {
        let alert = me.alertCtrl.create({
          title: "Correcto!",
          message: "Se envió su calificación satisfactoriamente.",
          buttons: ['Ok']
        });
        alert.present();
        me.dismiss();
      }
    });
  }

  dismiss() {
    window.location.reload();
    /*let me = this;
    this.viewCtrl.dismiss();*/
  }
}