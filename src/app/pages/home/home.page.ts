import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
export interface GeoL{
  altitude?: null;
  altitudeAccuracy?: null;
  heading?: null;
  latitude: any;
  longitude: any;
  speed?: null;
  timestamp?: any;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentLoc:GeoL = null;
  currLocHis:GeoL[] = [];
  constructor() { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  // get the current location
  async getCurrentLocation(){
   await Geolocation.getCurrentPosition().then(res=>{
      this.currentLoc = {latitude:res.coords.latitude,longitude:res.coords.longitude,timestamp:new Date(res.timestamp)}
      console.log("current location",this.currentLoc);
      this.currLocHis.unshift(this.currentLoc)
    });
  }

  clearHistory(){
    this.currLocHis = [];
  }
}
