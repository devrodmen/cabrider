import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})

export class MapDirective implements OnInit {

  public map;

  constructor() {
  }

  ngOnInit() {
    this.map = this.createMap();
  }

  createMap(location = new google.maps.LatLng(-16.4039671, -71.5740312)) {
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);

    return map;
  }

}
