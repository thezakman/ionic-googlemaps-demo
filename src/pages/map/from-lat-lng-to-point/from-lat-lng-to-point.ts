import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  LatLng
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-from-lat-lng-to-point',
  templateUrl: 'from-lat-lng-to-point.html',
})
export class FromLatLngToPointPage {
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    var self = this;
    setTimeout(self.loadMap.bind(self), 1000);
  }

  loadMap() {
    var self = this;
    this.map = this.googleMaps.create('map_canvas');
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("map is ready to use.");

      var center = self.map.getCameraTarget();

      self.map.addMarker({
        position: center,
        draggable: true,
        title: "Drag me!"
      }).then((marker: Marker) => {
        marker.showInfoWindow();

        marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(self.onMarkerDragEnd.bind(self));
      });

    });
  }


  onMarkerDragEnd(params) {
    var latLng = params[0];
    var marker = params[1];
    console.log(latLng, marker);

    // LatLng -> Point
    this.map.fromLatLngToPoint(latLng).then((point: any[]) => {

      // Show on the marker
      marker.setTitle("left : " + point[0].toFixed(1) + "px\n" + "top : " + point[1].toFixed(1) + "px");
      marker.showInfoWindow();
    });
  }

}
