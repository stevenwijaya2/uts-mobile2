import { Component, OnInit } from '@angular/core';
import {Item} from './item.model';
import {ItemsService} from './items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  items: Item[];
  grid = true;
  constructor(private itemService: ItemsService) { }

  ngOnInit() {
    this.items = this.itemService.getAllItem();
  }

  ionViewWillEnter(){
    this.items = this.itemService.getAllItem();
  }

  viewMode(){
   this.grid = !this.grid;
   console.log(this.grid);
  }


}
