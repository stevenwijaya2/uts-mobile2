import { Component, OnInit } from '@angular/core';
import {Item} from '../item/item.model';
import {ItemsService} from '../item/items.service';
import {AlertController, IonItemSliding, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  items: Item[];
  constructor(
      private router: Router,
      private itemService: ItemsService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.items = this.itemService.getAllItem();
  }

  ionViewWillEnter(){
    this.items = this.itemService.getAllItem();
  }

  edit(item: Item, slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async presentAlert(item: Item, slidingItem: IonItemSliding) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure ?',
      message: '',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            await slidingItem.close();
            this.itemService.deleteItem(item.model);
            console.log('abis delete di service');
            this.router.navigate(['/admin']);
            const toast = await this.toastCtrl.create({
              message: 'Items Successfully Deleted',
              duration: 2000,
              color: 'success'
            });
            await toast.present();
            this.ionViewWillEnter();
          }

        }
      ]
    });
    await alert.present();
  }


}
