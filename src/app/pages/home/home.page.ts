import { Component, NgZone, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
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
  constructor(private ngZone:NgZone,private common:CommonService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }
  ionViewWillEnter(){
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log("calling",e);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // e.preventDefault();
      // // Stash the event so it can be triggered later.
      // deferredPrompt = e;
      // // Update UI to notify the user they can add to home screen
      // addBtn.style.display = 'block';
    
      // addBtn.addEventListener('click', (e) => {
      //   // hide our user interface that shows our A2HS button
      //   addBtn.style.display = 'none';
      //   // Show the prompt
      //   deferredPrompt.prompt();
      //   // Wait for the user to respond to the prompt
      //   deferredPrompt.userChoice.then((choiceResult) => {
      //       if (choiceResult.outcome === 'accepted') {
      //         console.log('User accepted the A2HS prompt');
      //       } else {
      //         console.log('User dismissed the A2HS prompt');
      //       }
      //       deferredPrompt = null;
      //     });
      // });
    });
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
