import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../../providers/conference-data';
import { ReservaService } from '../../../services/reservas.service';

import { Platform, ViewController, NavController, ModalController } from 'ionic-angular';

/**
 * Modal Autocomplete
 */
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
  

  openModal() {
    let me = this;
      this.confData.getMap().subscribe((mapData: any) => {
          
          me.mapEle = this.mapElement.nativeElement;
          if(me.mapEle != undefined) {
            me.map = new google.maps.Map(me.mapEle, {
              center: {lat: -16.398861, lng: -71.536972},
              zoom: 13,
              disableDefaultUI: true
            });
          }

          google.maps.event.addListenerOnce(this.map, 'idle', () => {
            let marker = new google.maps.Marker({
              position: {lat: -16.398861, lng: -71.536972},
              map: this.map,
              draggable: true,
              title: 'MARCADOR DEL GRUPO'
            });
            me.mapEle.classList.add('show-map');
          });
      });
    
  }

  continuar() {
    let me = this;
      console.log(me.origen);
      console.log(me.destino);
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
