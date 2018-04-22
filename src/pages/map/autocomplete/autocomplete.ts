import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Platform, ViewController, NavParams, NavController, IonicPage, AlertController } from 'ionic-angular';
import { ConferenceData } from '../../../providers/conference-data';

declare var google: any;

@IonicPage()
@Component({
  selector:'page-autocomplete',
  templateUrl: 'autocomplete.html'
})

export class AutocompletePage {
  public autocompleteDestino;
  public autocompleteOrigen;
  public autocomplete;
  public origen;
  public origenexacto;
  public destino;
  public destinoexacto;
  public dataFinal;
  orilat: number = 0;
  orilon: number = 0;
  deslat: number = 0;
  deslon: number = 0;
  geo: any;

  service = new google.maps.places.AutocompleteService();
  public form;

  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsDisplay;

  @ViewChild('mapCanvas') mapElement: ElementRef;
  @ViewChild('origenRuta') origenElement: ElementRef;
  @ViewChild('destinoRuta') destinoElement: ElementRef;

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public platform: Platform,
    private ngZone: NgZone,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private view: ViewController,
    public navParams: NavParams) {
      this.autocompleteOrigen = '';
      this.autocompleteDestino = '';
      this.autocomplete = {
        origen: '',
        destino: ''
      };
    }

  Ondismiss() {
    this.viewCtrl.dismiss().catch(() => console.log('view was not dismissed'));
  }

  chooseItem(item: any, type) {
    
    let geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ 'address': item }, (results) => {      
      if(type == 'origen') {
        this.autocomplete.origen = item;
        this.orilon = results[0].geometry.location.lng();
        this.orilat = results[0].geometry.location.lat();
        this.origen = item;
        this.originPlaceId = results[0].place_id;

        this.autocompleteOrigen = [];
      } else if (type == 'destino') {
        this.autocomplete.destino = item;
        this.deslon = results[0].geometry.location.lng();
        this.deslat = results[0].geometry.location.lat();
        this.destino = item;
        this.destinationPlaceId =  results[0].place_id;
        this.autocompleteDestino = [];
      }
    });
  }

  continuarReserva() {
    if(
      this.autocomplete.origen != '' &&
      this.autocomplete.destino != '' &&
      this.autocomplete.origenexacto != '' &&
      this.autocomplete.destinoexacto != ''
    ) {
      this.dataFinal = {
        deslon : this.deslon,
        deslat : this.deslat,
        destino : this.destino,
        destinationPlaceId : this.destinationPlaceId,
        autocompleteDestino : this.autocompleteDestino,
        origenexacto : this.autocomplete.origenexacto,
        destinoexacto : this.autocomplete.destinoexacto,
        orilon : this.orilon,
        orilat : this.orilat,
        origen : this.origen,
        originPlaceId : this.originPlaceId
      }
      this.viewCtrl.dismiss(this.dataFinal).catch(() => {
        console.log('Vista no desecha');
      });
    } else {
      alert("Debe llenar todos los campos para continuar");
    }
  }

  updateSearch(type) {
    if(type == 'origen') {
      if (this.autocomplete.origen == '') {
        this.autocompleteOrigen = [];
        return;
      }
      let me = this;
      me.service.getQueryPredictions(
        {input: me.autocomplete.origen},
        (predictions, status) => {
          me.autocompleteOrigen = [];
          me.ngZone.run(() => {
            predictions.forEach((prediction) => {
              me.autocompleteOrigen.push(prediction);
            });
          });
        })
    } else if(type == 'destino') {
      if (this.autocomplete.destino == '') {
        this.autocompleteDestino = [];
        return;
      }

      let me = this;
      me.service.getQueryPredictions(
        {input: me.autocomplete.destino},
        (predictions, status) => {
          me.autocompleteDestino = [];
          me.ngZone.run(() => {
            predictions.forEach((prediction) => {
              me.autocompleteDestino.push(prediction);
            });
          });
        })
    }
  }

  close() {
    this.view.dismiss();
  }

  message(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}

