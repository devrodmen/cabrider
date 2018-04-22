import { Component, NgZone } from '@angular/core';
import { Platform, ViewController, NavParams, NavController, IonicPage } from 'ionic-angular';
import { ConferenceData } from '../../../providers/conference-data';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-autocomplete-destino',
  templateUrl: 'autocomplete-destino.html',
})
export class AutocompleteDestinoPage {

  public autocompleteItems;
  public autocomplete;
  latitude: number = 0;
  longitude: number = 0;
  public destinoId;
  geo: any;

  service = new google.maps.places.AutocompleteService();

  boton1: boolean = false;
  boton2: boolean = false;
  boton3: boolean = false;
  boton4: boolean = false;
  public form;

  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsDisplay;

  constructor(
    public confData: ConferenceData,
    public platform: Platform,
    private ngZone: NgZone,
    public viewCtrl: ViewController,
    public navCtrl: NavController, private view: ViewController, public navParams: NavParams
  ) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ionViewDidLoad() {
    this.updateSearch();
  }

  Ondismiss() {
    this.viewCtrl.dismiss().catch(() => console.log('view was not dismissed'));
  }

  chooseItem(item: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': item }, (results) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      this.destinoId = results[0].place_id;

      const dataFinal = {
        longitud: this.longitude,
        latitud: this.latitude,
        direccion: item,
        destinoid: this.destinoId
      };

      this.viewCtrl.dismiss(dataFinal).catch(() => {
        console.log('Vista no desecha');
      });
    });


    /*this.viewCtrl.dismiss(item).catch(() => console.log('view was not dismissed'));
    this.geo = item;
    this.geoCode(this.geo);*///convert Address to lat and long
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }

    let me = this;

    me.service.getQueryPredictions({ input: this.autocomplete.query,  componentRestrictions: {country: 'TH'} }, function (predictions) {
      me.autocompleteItems = []; 
      me.ngZone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

  close() {
    this.view.dismiss();
  }

}
