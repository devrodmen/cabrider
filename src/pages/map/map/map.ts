import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../../providers/conference-data';
import { ReservaService } from '../../../services/reservas.service';

import { Platform, ViewController, NavController, ModalController } from 'ionic-angular';

/**
 * Modal Autocomplete
 */
import { AutocompletePage } from '../autocomplete/autocomplete';
import { ReservaPage } from '../../reserva/reserva';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  reservas = [];
  /**
   * Autocompletar places
   */

  public item: Array<any>;
  public item2: Array<any>;


  public start_location;
  public autocompleteItems;
  public autocomplete;
  public origen = '';
  public origenexacto = '';
  public destino = '';
  public destinoexacto = '';
  latitude: number = 0;
  longitude: number = 0;
  public origlat;
  public origlon;
  public destlat;
  public destlon;


  public map = '';
  public mapEle;

  originPlaceId;
  destinationPlaceId;
  geo: any;

  public form;
  travelMode;
  directionsService;
  directionsDisplay;
  
  @ViewChild('mapCanvas') mapElement: ElementRef;
  @ViewChild('origenRuta') origenElement: ElementRef;
  @ViewChild('destinoRuta') destinoElement: ElementRef;

  constructor(
    public confData: ConferenceData,
    public platform: Platform,
    public viewCtrl: ViewController,
    private nav: NavController,
    public reservaService: ReservaService,
    public modal: ModalController
  ) {
    this.travelMode = 'DRIVING';
    this.item = [];
    this.item2 = [];
    this.map = '';
    /**
     * Autocomplete places
     */
  }

  /*ionViewDidLoad() {
    let me = this;
      this.confData.getMap().subscribe((mapData: any) => {
        var mapEle = this.mapElement.nativeElement;

        var map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 16
        });

        me.directionsService = new google.maps.DirectionsService;
        me.directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map
        });

        me.directionsDisplay.addListener('directions_changed', function() {
          let directions = me.directionsDisplay.getDirections();
          let info = directions.routes[0].legs[0];
          me.origlat = info.start_location.lat();
          me.origlon = info.start_location.lng();
          me.destlat = info.end_location.lat();
          me.destlon = info.end_location.lng();
          me.origen = info.start_address;
          me.destino = info.end_address;
        });


        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });
      });
  }*/

  openModal() {
    let me = this;
    const autocomplete = this.modal.create(AutocompletePage);
    autocomplete.present();

    autocomplete.onDidDismiss((data) => {
      this.confData.getMap().subscribe((mapData: any) => {
        console.log(mapData);
        if(data === undefined)  {
          
        } else {
          
          me.mapEle = this.mapElement.nativeElement;
          if(me.mapEle != undefined) {
            me.map = new google.maps.Map(me.mapEle, {
              center: {lat: -16.358803, lng: -71.5510502},
              zoom: 16,
              disableDefaultUI: true
            });
        
            me.directionsService = new google.maps.DirectionsService;
            me.directionsDisplay = new google.maps.DirectionsRenderer({
              draggable: true,
              map: me.map
            });
        
            me.directionsDisplay.addListener('directions_changed', function() {
              let directions = me.directionsDisplay.getDirections();
              let info = directions.routes[0].legs[0];
              me.origlat = info.start_location.lat();
              me.origlon = info.start_location.lng();
              me.destlat = info.end_location.lat();
              me.destlon = info.end_location.lng();
              me.origen = info.start_address;
              me.destino = info.end_address;
            });
        
            google.maps.event.addListenerOnce(me.map, 'idle', () => {
              me.mapEle.classList.add('show-map');
            });
          }

          this.origen = data.origen;
          this.origenexacto = data.origenexacto;
          this.destinoexacto = data.destinoexacto;
          this.origlat = data.orilat;
          this.origlon = data.orilon;
          this.originPlaceId = data.originPlaceId;
          this.destino = data.destino;
          this.destlat = data.deslat;
          this.destlon = data.deslon;
          this.destinationPlaceId = data.destinationPlaceId;

          this.route(data);
        }
      });
    });
  }

  route(data) {
    let me = this;
    me.directionsService.route({
      origin: data.orilat + "," + data.orilon,
      destination: data.deslat + "," + data.deslon,
      travelMode: this.travelMode
    }, function(response, status) {
      if(status === 'OK') {
        me.directionsDisplay.setDirections(response);
      } else {
        window.alert('Las direcciones han fallado por ' + status);
      }
    })
  }

  getRuta(directions) {
    let info = directions.routes[0].legs[0];
    this.origlat = info.start_location.lat();
		this.origlon = info.start_location.lng();
		this.destlat = info.end_location.lat();
		this.destlon = info.end_location.lng();
		this.origen = info.start_address;
		this.destino = info.end_address;
  }

  continuar() {
    let me = this;
    if(me.origen == '' || me.origenexacto == '' || me.destino == '' || me.destinoexacto == ''){
      alert("Debe llenar todos los campos para poder continuar.");
      
    } else {
      console.log(me.origen);
      console.log(me.origenexacto);
      console.log(me.destino);
      console.log(me.destinoexacto);
      const myData = {
        origenplaceid: this.originPlaceId,
        origen: this.origen,
        origenexacto: this.origenexacto,
        origenlat: this.origlat,
        origenlon: this.origlon,
        destinoplaceid: this.destinationPlaceId,
        destino: this.destino,
        destinoexacto: this.destinoexacto,
        destinolat: this.destlat,
        destinolon: this.destlon
      }

      this.nav.push(ReservaPage, {data: myData});
    }
  }
}
