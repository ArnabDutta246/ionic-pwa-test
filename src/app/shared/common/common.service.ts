import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
export enum AlertMsgIcon {
  SuccessIcon = 'checkmark-circle',
  ErrorIcon = 'close-circle',
  WarningIcon = 'information-circle',
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor( public toastController: ToastController,) { }

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
}
