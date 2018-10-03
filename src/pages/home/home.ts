import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ScanPage} from '../scan/scan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  moveToScannerPage(){
    this.navCtrl.push(ScanPage); 
  }

}
