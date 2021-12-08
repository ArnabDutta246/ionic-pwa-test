import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
export enum AlertMsgIcon {
  SuccessIcon = 'checkmark-circle',
  ErrorIcon = 'close-circle',
  WarningIcon = 'information-circle',
}
export interface A2HS{
 promt:any;
 showButton:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // add to home screen
  a2hs = new BehaviorSubject<A2HS|null>(null);
  a2hs$ = this.a2hs.asObservable();
  constructor( public toastController: ToastController,private updates: SwUpdate) {
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      updates.activateUpdate().then(() => document.location.reload());
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
   }

    /**================  [ Toaster controller]  ======================**/
    async presentToast(
      message: string,
      mode: 'success' | 'error',
      duration: number = 3000
    ) {
      const toast = await this.toastController.create({
        message: `<ion-icon name=${
          mode == 'success' ? AlertMsgIcon.SuccessIcon : AlertMsgIcon.ErrorIcon
        } class="toast-icon"></ion-icon>  ${message}`,
        duration: duration,
        color: mode == 'error' ? 'danger' : 'success',
        position: 'top',
        keyboardClose: false,
        cssClass: 'toaster-class',
        mode: 'md',
      });
      toast.present();
    }


    //============== [ A2HS ] ======================
    // pwa re-register
    addToHomeScreen(a2sh:A2HS) {
      // hide our user interface that shows our A2HS button
      a2sh.showButton = false;
      // Show the prompt
      a2sh.promt.prompt();
      // Wait for the user to respond to the prompt
      a2sh.promt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          a2sh.promt = null;

          this.a2hs.next(a2sh);
        });
    }
}
