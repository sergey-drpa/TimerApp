import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';


import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  };
  logg: string = "";

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, private localNotifications: LocalNotifications, private zone: NgZone ) {
    this.item = navParams.get('item') || items.defaultItem;

    let now = new Date();
    //debugger;
    this.event.timeStarts = (now.getHours()+1)+':'+(now.getMinutes()+1);
  }

  dayChanged(){
    let times = this.event.timeStarts.split(':');
    let now = new Date();
    debugger;
    now.setHours(parseInt(times[0]), parseInt(times[1]));

    try {
      this.logg += "Planned: " + now+"\n";
      let res = this.localNotifications.schedule({
        text: 'Delayed ILocalNotification',
        trigger: {at: new Date(now)},
        led: 'FF0000',
        wakeup: true,
        vibrate: true
      });

      this.zone.run(() => {
        this.logg += "Scheduled: : " + JSON.stringify(res)+"\n";
        console.log(res);
      });
    }catch(e)
    {
      this.logg += "Error: " + JSON.stringify(e)+"\n";
      console.log("Error", e);
    }
  }

  shwoNotify(){
    let res = this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      led: '00FF00',
      data: 'test'
    });

    this.zone.run(() => {
      this.logg += "Scheduled: : " + JSON.stringify(res)+"\n";
      console.log(res);
    });
  }

}
