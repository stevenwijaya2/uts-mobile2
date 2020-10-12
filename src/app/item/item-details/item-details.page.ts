import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemsService} from '../items.service';
import {Item} from '../item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  loadedItem: Item;
  constructor(
      private activatedRoute: ActivatedRoute,
      private itemServices: ItemsService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // if there's no contactId on url or params
      if (!paramMap.has('itemName')){ return; }
      // get contactId from params or URL
      const itemName = paramMap.get('itemName');
      // load contact detail based on contactId on URL or Params
      this.loadedItem = this.itemServices.getSelectedItem(itemName);
    });
  }

}
