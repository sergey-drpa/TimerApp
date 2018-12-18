import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { BackgroundMode } from '@ionic-native/background-mode';
import { Dialogs } from '@ionic-native/dialogs';


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
    timeEnds: '1990-02-20',
    interval: 0
  };
  logg: string = "";

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, private localNotifications: LocalNotifications, private zone: NgZone, private backgroundMode: BackgroundMode, private dialogs: Dialogs ) {
    this.item = navParams.get('item') || items.defaultItem;

    let times = this.item.name.split(" - ");
    this.event.timeStarts = times[0];
    this.event.timeEnds = times[1];
    this.event.interval = parseInt(this.item.interval);
    debugger;
    //let now = new Date();
    //debugger;
    //this.event.timeStarts = (now.getHours()+1)+':'+(now.getMinutes()+1);
  }

  dayChanged(){
    let times = this.event.timeStarts.split(':');
    let now = new Date();
    debugger;
    now.setHours(parseInt(times[0]));
    now.setMinutes(parseInt(times[1]));

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
    this.backgroundMode.enable();
    //window.cordova.plugins.backgroundMode.enable();

    let times = this.event.timeStarts.split(':');
    let now = new Date();
    debugger;
    now.setHours(parseInt(times[0]));
    now.setMinutes(parseInt(times[1]));

    let self = this;
    let interval = setInterval(function () {
      if(new Date().getTime() > now.getTime()) {
        clearInterval(interval);
        self.backgroundMode.wakeUp();
        self.backgroundMode.unlock();
        self.backgroundMode.disable();
        self.dialogs.alert('Wake App');
        self.dialogs.beep(30);
      }
    }, 1000);

    /*let res = this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      led: '00FF00',
      data: 'test'
    });*/

    /*this.zone.run(() => {
      this.logg += "Scheduled: : " + JSON.stringify(res)+"\n";
      console.log(res);
    });*/
  }

}
