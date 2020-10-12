import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ItemsService} from '../../item/items.service';
import {Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  newItem: FormGroup;
  // tslint:disable-next-line:max-line-length
  private checkItem: { price: number; imageUrl: string; name: string; model: string; stock: number; type: string; brand: string; desc: { base_clock: string; boost_clock: string; core: number; thread: number; processor_compabilty: string; motherboard_chipset: string; ram_type: string; ram_speed: string } };
  constructor(
      private router: Router,
      private itemService: ItemsService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController
  ) { }
  // tslint:disable-next-line:max-line-length
  type: string;
  name: string;

  ngOnInit() {
    this.newItem = new FormGroup({
      model: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      brand: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      imageUrl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      stock: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      type: new FormControl(null, {
        updateOn: 'change',
      }),
      base_clock: new FormControl(null, {
        updateOn: 'blur',
      }),
      boost_clock: new FormControl(null, {
        updateOn: 'blur',
      }),
      core: new FormControl(null, {
        updateOn: 'blur',
      }),
      thread: new FormControl(null, {
        updateOn: 'blur',
      }),
      processor_compability: new FormControl(null, {
        updateOn: 'blur',
      }),
      motherboard_chipset: new FormControl(null, {
        updateOn: 'blur',
      }),
      ram_type: new FormControl(null, {
        updateOn: 'blur',
      }),
      ram_speed: new FormControl(null, {
        updateOn: 'blur',
      }),
    });
  }
  async presentAlertAdd() {
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
          text: 'Add',
          handler: async () => {
            this.name = this.newItem.value.brand + ' ' + this.newItem.value.model;
            this.checkItem = this.itemService.getSelectedItem(this.name);
            if (this.checkItem.name === this.name){
              this.router.navigate(['/admin']);
              const toast = await this.toastCtrl.create({
                message: 'Items Already Exist',
                duration: 2000,
                color: 'danger'
              });
              await toast.present();
            }
            else {
              this.itemService.newItem(this.newItem, this.type);
              this.router.navigate(['/admin']);
              const toast = await this.toastCtrl.create({
                message: 'Items Successfully Added to Collections',
                duration: 2000,
                color: 'success'
              });
              await toast.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
