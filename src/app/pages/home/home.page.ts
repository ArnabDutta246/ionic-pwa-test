import { Component, NgZone, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { A2HS, CommonService } from 'src/app/shared/common/common.service';
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
  wait:any;
  showBtn:boolean = false;
  pmt:any;
  a2hsRes:A2HS;
  constructor(private ngZone:NgZone,private common:CommonService,private platform:Platform) { }

  ngOnInit() {
    this.getCurrentLocation();
  }
  ionViewWillEnter(){
    if (!this.platform.is('pwa')) {
      this.common.addToHomeScreen(this.a2hsRes);
    }
    this.common.a2hs$.subscribe((res:A2HS)=>{
      console.log("a2hs",res);
      if(res){
        this.showBtn = res.showButton;
        this.pmt = res.promt;
        this.a2hsRes = res;
      }
    })
  }


  // a2hs
  addToHome(){
    this.common.addToHomeScreen(this.a2hsRes);
  }

  // get the current location
  async getCurrentLocation(){
   await Geolocation.getCurrentPosition().then(res=>{
      this.currentLoc = {latitude:res.coords.latitude,longitude:res.coords.longitude,timestamp:new Date(res.timestamp)}
      console.log("current location",this.currentLoc);
      this.currLocHis.unshift(this.currentLoc)
    });
  }
  async watchPos(){
  this.wait = await Geolocation.watchPosition({},(res,err)=>{
      console.log(res);
      this.ngZone.run(()=>{
        this.currentLoc = {latitude:res.coords.latitude,longitude:res.coords.longitude,timestamp:new Date(res.timestamp)}
        console.log("current location",this.currentLoc);
        this.currLocHis.unshift(this.currentLoc);
      })
    })
  }
  clearHistory(){
    this.currLocHis = [];
    Geolocation.clearWatch({id:this.wait});
  }
}
