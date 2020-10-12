import { Injectable } from '@angular/core';
import {Item} from './item.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Item[] = [
    {
      id: 1,
      name: 'Intel Core i3-10100',
      model: 'Core i3-10100',
      type: 'cpu',
      brand: 'Intel',
      price: 1949999,
      stock: 12,
      imageUrl: 'https://www.klikgalaxy.com/image-product/img21619-1592803328.jpg',
      desc: {
        base_clock: '3.6Ghz',
        boost_clock: '4.3Ghz',
        core: 4,
        thread: 8,
        processor_compabilty: null,
        motherboard_chipset: null,
        ram_type: null,
        ram_speed: null
      }
    },
    {
      id: 2,
      name: 'Asus ROG STRIX Z490-E GAMING',
      model: 'ROG STRIX Z490-E GAMING',
      brand: 'Asus',
      type: 'motherboard',
      price: 5500000,
      stock: 3,
      imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/8/29/57c1accf-6bc1-44e6-971e-45b9d6985782.jpg',
      desc: {
        base_clock: null,
        boost_clock: null,
        core: null,
        thread: null,
        processor_compabilty: '10th Gen Intel® Core™ processors',
        motherboard_chipset: 'Intel® Z490',
        ram_type: null,
        ram_speed: null
      }
    },
    {
      id: 3,
      name: 'G.Skill Trident Z RGB',
      model: 'Trident Z RGB',
      type: 'ram',
      brand: 'G.Skill',
      price: 1828000,
      stock: 33,
      imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/8/27/5024822/5024822_e3f2df3c-adef-4c1e-a761-425cc4c5a014_1680_964.jpg',
      desc: {
        base_clock: null,
        boost_clock: null,
        core: null,
        thread: null,
        processor_compabilty: null,
        motherboard_chipset: null,
        ram_type: 'DIMM',
        ram_speed: '3200MHz',
      }
    }
  ];
  private allItem: any[];

  constructor(
  ) { }

  getAllItem(){
    this.allItem = [];
    let counter1 = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let counter2 = 0; counter2 < this.items.length; counter2++){
      if (this.items[counter2].stock > 0){
        this.allItem[counter1] = this.items[counter2];
        counter1++;
      }
    }
    return [...this.allItem];
  }
  getSelectedItem(itemName: string) {
    return {
      ...this.items.find(item => {
        return item.name === itemName;
      })
    };
  }
  deleteItem(itemModel: string){
    console.log(itemModel);
    this.items = this.items.filter(item => {
      return item.model !== itemModel;
    });
  }
  newItem(form: FormGroup, type: string) {
    const newItem = {
      id: this.items.length + 1,
      name: form.value.brand + ' ' + form.value.model,
      model: form.value.model,
      brand: form.value.brand,
      type,
      price: form.value.price,
      stock: form.value.stock,
      imageUrl: form.value.imageUrl,
      desc: {
        base_clock: form.value.base_clock,
        boost_clock: form.value.boost_clock,
        core: form.value.core,
        thread: form.value.thread,
        processor_compabilty: form.value.processor_compability,
        motherboard_chipset: form.value.motherboard_chipset,
        ram_type: form.value.ram_type,
        ram_speed: form.value.ram_speed
      }
    };
    this.items.push(newItem);
  }
  editItem(id: number, form: FormGroup){
    let counter = 0;
    const editItem = {
      id,
      name: form.value.brand + ' ' + form.value.model,
      model: form.value.model,
      brand: form.value.brand,
      type: form.value.type,
      price: form.value.price,
      stock: form.value.stock,
      imageUrl: form.value.imageUrl,
      desc: {
        base_clock: form.value.base_clock,
        boost_clock: form.value.boost_clock,
        core: form.value.core,
        thread: form.value.thread,
        processor_compabilty: form.value.processor_compability,
        motherboard_chipset: form.value.motherboard_chipset,
        ram_type: form.value.ram_type,
        ram_speed: form.value.ram_speed
      }
    };
    do{
      console.log(this.items[counter].id);
      if (this.items[counter].id === id) {
        this.items[counter].name = editItem.name;
        this.items[counter].imageUrl = editItem.imageUrl;
        this.items[counter].model = editItem.model;
        this.items[counter].brand = editItem.brand;
        this.items[counter].type = editItem.type;
        this.items[counter].price = editItem.price;
        this.items[counter].stock = editItem.stock;
        this.items[counter].desc = editItem.desc;
        break;
      }
      counter++;
    }
    while (counter <= this.items.length);
  }
}
