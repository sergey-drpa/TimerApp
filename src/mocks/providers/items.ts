import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/alarm.jpg",
    "about": "Burt is a Bear.",
    interval: 30
  };


  constructor() {
    let items = [
      {
        "name": "09:00 - 23:00",
        "profilePic": "assets/img/speakers/alarm.jpg",
        "about": "Каждые 30 мин.",
        interval: 30
      },
      {
        "name": "11:00 - 21:00",
        "profilePic": "assets/img/speakers/alarm.jpg",
        "about": "Каждые 45 мин.",
        interval: 45
      }
      ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
