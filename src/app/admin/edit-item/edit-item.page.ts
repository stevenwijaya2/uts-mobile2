import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService} from '../../item/items.service';
import {AlertController, ToastController} from '@ionic/angular';
import {Item} from '../../item/item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  private newItem: FormGroup;
  loadedItem: Item;
  id: number;
  model: string;
  brand: string;
  imageUrl: string;
  price: number;
  stock: number;
  type: string;
  baseClock: string;
  boostClock: string;
  core: number;
  thread: number;
  processorCompabilty: string;
  motherboardChipset: string;
  ramType: string;
  ramSpeed: string;
  private editItem: FormGroup;
  // tslint:disable-next-line:max-line-length
private name: string;
  // tslint:disable-next-line:max-line-length
  private checkItem: { price: number; imageUrl: string; name: string; model: string; stock: number; type: string; brand: string; desc: { base_clock: string; boost_clock: string; core: number; thread: number; processor_compabilty: string; motherboard_chipset: string; ram_type: string; ram_speed: string } };
  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private itemService: ItemsService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // if there's no item Model on url or params
      if (!paramMap.has('itemName')){ return; }
      else{
        // get item Model from params or URL
        const itemName = paramMap.get('itemName');
        this.loadedItem = this.itemService.getSelectedItem(itemName);
        this.id = this.loadedItem.id;
        this.model = this.loadedItem.model;
        this.imageUrl = this.loadedItem.imageUrl;
        this.brand = this.loadedItem.brand;
        this.type = this.loadedItem.type;
        this.price = this.loadedItem.price;
        this.stock = this.loadedItem.stock;
        this.baseClock = this.loadedItem.desc.base_clock;
        this.boostClock = this.loadedItem.desc.boost_clock;
        this.core = this.loadedItem.desc.core;
        this.thread = this.loadedItem.desc.thread;
        this.processorCompabilty = this.loadedItem.desc.processor_compabilty;
        this.motherboardChipset = this.loadedItem.desc.motherboard_chipset;
        this.ramSpeed = this.loadedItem.desc.ram_speed;
        this.ramType = this.loadedItem.desc.ram_type;
        this.editItem = new FormGroup({
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
        console.log(this.type);
      }
    });
  }

  async presentAlertEdit() {
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
          text: 'Save',
          handler: async () => {
              this.itemService.editItem(this.id , this.editItem);
              this.router.navigate(['/admin']);
              const toast = await this.toastCtrl.create({
                message: 'Items Successfully Edited',
                duration: 2000,
                color: 'success'
              });
              await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

}
