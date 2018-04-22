import { Component, OnInit } from '@angular/core';

import { NavParams, ViewController, IonicPage, NavController, ModalController } from 'ionic-angular';

import { Data } from '../../providers/data';

import { DetailPage } from '../detail/detail';

import SlidingMarker from "marker-animate-unobtrusive";

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage{
  //@Input() map: google.maps.Map;
  error: string;
  //@ViewChild('mapCanvas') mapElement: ElementRef;

  public marker = null;
  public markerArray = [];
  public stepDisplay;
  public posMov;
  travelMode = "WALKING";
  directionsService;
  directionsDisplay;
  public directionsDistance = new google.maps.DistanceMatrixService;
  tracks: Array<{name: string, isChecked: boolean}> = [];
  datos: any = [];
  public person_image;
  public movil_image;
  public icons = {
    start: new google.maps.MarkerImage(
    // URL
    'http://144.217.7.226/remisse21/public/markers/home-2.png',
    // (width,height)
    new google.maps.Size(40, 40),
    // The origin point (x,y)
    new google.maps.Point(0, 0),
    // The anchor point (x,y)
    new google.maps.Point(22, 32)),
    end: new google.maps.MarkerImage(
    // URL
    'http://144.217.7.226/remisse21/public/markers/finish.png',
    // (width,height)
    new google.maps.Size(40, 40),
    // The origin point (x,y)
    new google.maps.Point(0, 0),
    // The anchor point (x,y)
    new google.maps.Point(22, 32)),
    car: new google.maps.MarkerImage(
    // URL
    'http://144.217.7.226/remisse21/public/markers/car.png',
    // (width,height)
    new google.maps.Size(40, 40),
    // The origin point (x,y)
    new google.maps.Point(0, 0),
    // The anchor point (x,y)
    new google.maps.Point(22, 32))
  };

  public map;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public data: Data,
    public modalCtrl: ModalController
  ) {
    //let dataRes = this.navParams.get('data');
    
    setInterval(() => {
      this.updateMap();
    }, 120000);
  }

  ionViewDidLoad() {
    let idreserva = this.navParams.get('datos');
    this.map = this.iniciarMapa();
    this.getReservaDetail(idreserva);
  }

  iniciarMapa() {
    let location = new google.maps.LatLng(-16.4039671, -71.5740312);
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let map = new google.maps.Map(document.getElementById('map_canvas_detail'), mapOptions);

    return map;
  }

  getReservaDetail(idreserva) {

    let me = this;

    /*if(idreserva == null || idreserva == undefined) {
      me.datos = dataRes;
      me.person_image = "http://144.217.7.226/remisse21/public/personal/imagenes/" + me.datos.persona_imagen;
      me.movil_image = "http://144.217.7.226/remisse21/public/personal/imagenes/" + me.datos.movil_imagen;
      if(me.datos.reserva_estado != 4) {
        me.construir(
          me.datos.movil_placa,
          me.datos.reserva_origenlat,
          me.datos.reserva_origenlng,
          me.datos.reserva_destinolat,
          me.datos.reserva_destinolng
        );
      } else {
        me.construir(
          me.datos.movil_placa,
          me.datos.reserva_origenlat,
          me.datos.reserva_origenlng,
          me.datos.reserva_destinolat,
          me.datos.reserva_destinolng
        );
      }
    }*/

    me.data.getReservaDetail(idreserva).then((result) => {
      me.datos = result;
      me.person_image = "http://144.217.7.226/remisse21/public/personal/imagenes/" + me.datos.persona_imagen;
      me.movil_image = "http://144.217.7.226/remisse21/public/personal/imagenes/" + me.datos.movil_imagen;
      if(me.datos.reserva_estado != 4) {
        me.construir(
          me.datos.movil_placa,
          me.datos.reserva_origenlat,
          me.datos.reserva_origenlng,
          me.datos.reserva_destinolat,
          me.datos.reserva_destinolng
        );
      } else {
        me.construir(
          me.datos.movil_placa,
          me.datos.reserva_origenlat,
          me.datos.reserva_origenlng,
          me.datos.reserva_destinolat,
          me.datos.reserva_destinolng
        );
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  /** 
   * Construir mapa
  */
  construir(placa, origenlat, origenlng, destinolat, destinolng) {
    let me = this;
    var param = (
      "placa=" + placa
    );

    if(placa != null) {
      let me = this;
      if(me.datos.reserva_estado == 4) {
        me.data.getDataParam('getPosition', param).then((response) => {
          let origen = origenlat + "," + origenlng;
          let destino = destinolat + "," + destinolng;
          me.initMap(
            parseFloat(origenlat),
            parseFloat(origenlng),
            origen,
            destino,
            response["movil_latitude"],
            response["movil_longitude"]
          );
        });
      } else {
        let origen = origenlat + "," + origenlng;
        let destino = destinolat + "," + destinolng;
        me.initMap(
          parseFloat(origenlat),
          parseFloat(origenlng),
          origen,
          destino
        );
      }
    } else {
      if(me.datos.reserva_estado == 4) {
        me.data.getDataParam('getPosition', param).then((response) => {
          let origen = origenlat + "," + origenlng;
          let destino = destinolat + "," + destinolng;
          me.initMap(
            parseFloat(origenlat),
            parseFloat(origenlng),
            origen,
            destino,
            response["movil_latitude"],
            response["movil_longitude"]
          );
        });
      } else {
        let origen = origenlat + "," + origenlng;
        let destino = destinolat + "," + destinolng;
        me.initMap(
          parseFloat(origenlat),
          parseFloat(origenlng),
          origen,
          destino
        );
      }
    }
  }

  updateMap() {
    let me = this;
    if(me.datos.reserva_estado == 4) {
      var param = (
        "placa=" + me.datos.movil_placa
      );
      me.data.getDataParam('getPosition', param).then((response) => {
        let origen = me.datos.reserva_origenlat + "," + me.datos.reserva_origenlng;
            let destino = me.datos.reserva_destinolat + "," + me.datos.reserva_destinolng;
            me.actualizarMapa(
              parseFloat(me.datos.reserva_origenlat),
              parseFloat(me.datos.reserva_origenlng),
              origen,
              destino,
              response["movil_latitude"],
              response["movil_longitude"]
            );
      });
    }
  }

  actualizarMapa(lat, lng, origen, destino, mov_lat = null, mov_lon = null) {
    let me = this;
    let waypts = [];
    
    if(mov_lat != null) {
      waypts.push({
        location: origen,
        stopover: true/*,
        icon: me.icons.car*/
      });
    }

    me.recalculateMarkers(lat, lng, origen, destino, mov_lat, mov_lon);
  }

  initMap(lat, lng, origen, destino, mov_lat = null, mov_lon = null) {
    let me = this;
    me.directionsService = new google.maps.DirectionsService;
    me.directionsDisplay = new google.maps.DirectionsRenderer({
      map: me.map,
      suppressMarkers: true
    });
    me.route(origen, destino, me.map, mov_lat, mov_lon);
  }

  recalculateMarkers(lat, lng, origen, destino, mov_lat, mov_lon) {
    let me = this;
    
    let location = new google.maps.LatLng(mov_lat, mov_lon);

    // First, remove any existing markers from the map.
    //me.posMov.setMap(null);
    me.posMov.setPosition(location);
  }

  route(origen, destino, map, mov_lat = null, mov_lon = null) {
    let me = this;
    let waypts = [];
    
    if(mov_lat != null) {
      waypts.push({
        location: origen,
        stopover: true
      });
    }

    if(mov_lat == null) {
      me.directionsService.route({
        origin: origen,
        destination: destino,
        travelMode: me.travelMode
      }, function(response, status) {
        if(status === 'OK') {
          var _route = response.routes[0].legs[0];
          me.directionsDisplay.setDirections(response);

          me.makeMarker(_route.start_location, me.icons.start, "Inicio", map, 'inicio');
          me.makeMarker(_route.end_location, me.icons.end, 'Destino', map, 'destino');

        } else {
          console.log('Las direcciones han fallado por ' + status);
        }
      })
    } else {
      if(me.datos.reserva_estpos == 0) {
        let dir = mov_lat + "," + mov_lon;
        me.directionsService.route({
          origin: dir,
          destination: destino,
          travelMode: me.travelMode,
          waypoints: waypts,
          optimizeWaypoints: true
        }, function(response, status) {
          if(status === 'OK') {
            var _route = response.routes[0].legs[0];
            var _route2 = response.routes[0].legs[1];
            me.directionsDisplay.setDirections(response);

            me.posMov = me.makeMarker(_route.start_location, me.icons.car, "Inicio", map, 'car');
            me.makeMarker(_route.end_location, me.icons.start, 'Destino', map, 'inicio');
            me.makeMarker(_route2.end_location, me.icons.end, 'Fin', map, 'destino');

            me.directionsDistance.getDistanceMatrix({
              origins: [_route.start_location],
              destinations: [_route.end_location],
              travelMode: me.travelMode
            }, function(response, status) {
              var ori = response.originAddresses;
              for(var i =0; i < ori.length; i++) {
                var results = response.rows[i].elements;
                for(var j = 0 ; j < results.length; j++) {
                  var element = results[j];
                  
                  var dt = element.distance.text;
                  let distance = me.convertirDistancia(dt);
                  if(distance < 50) {
                    let d = (
                      "idreserva" + me.datos.reserva_idreserva
                    );
                    me.data.getDataParam('actualizarEstadoMov',d);
                  }
                }
              }
            });
          } else {
            console.log('Las direcciones han fallado por ' + status);
          }
        })
      } else {
        let dir = mov_lat + "," + mov_lon;
        me.directionsService.route({
          origin: dir,
          destination: destino,
          travelMode: me.travelMode
        }, function(response, status) {
          if(status === 'OK') {
            var _route = response.routes[0].legs[0];
            me.directionsDisplay.setDirections(response);

            me.makeMarker(_route.start_location, me.icons.car, "Inicio", map, 'inicio');
            me.makeMarker(_route.end_location, me.icons.end, 'Destino', map, 'destino');

            me.directionsDistance.getDistanceMatrix({
              origins: [_route.start_location],
              destinations: [_route.end_location],
              travelMode: me.travelMode
            }, function(response, status) {
              var ori = response.originAddresses;
              for(var i =0; i < ori.length; i++) {
                var results = response.rows[i].elements;
                for(var j = 0 ; j < results.length; j++) {
                  var element = results[j];
                  
                  var dt = element.distance.text;
                  let distance = me.convertirDistancia(dt);
                  if(distance < 50) {
                    
                  }
                }
              }
            });
          } else {
            console.log('Las direcciones han fallado por ' + status);
          }
        })
      }
    }
  }

  convertirDistancia(distancia) {
    let d = distancia.split(" ");
    if(d[1] != "m") {
      return d[0] * 1000;
    } else {
      return d[0];
    }
  }

  makeMarker(position, icon, title, map, id = null) {
    let me = this;
    me.marker = new SlidingMarker({
			position: position,
			map: map,
			icon: icon,
      title: title,
      easing: "linear"
    });

    me.marker.set('id', id);
    me.marker.setDuration(2000);
    
    return me.marker;
  }

  detalles() {
    let me = this;

    let infoModal = me.modalCtrl.create(DetailPage, {
      idreserva: me.navParams.get('datos'),
      dataRes: me.navParams.get('data')
    });
    infoModal.present();
  }
}
