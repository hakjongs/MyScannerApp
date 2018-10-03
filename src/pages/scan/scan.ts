import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

products: any[] = [];
selectedProduct: any;
productFound:boolean = false;

constructor(public navCtrl: NavController,
  private barcodeScanner: BarcodeScanner,
  private toast: Toast,
  public dataService: DataServiceProvider) {
    this.dataService.getProducts() 
      .subscribe((response)=> {
          this.products = response;
          console.log(this.products);
      });
}


  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  moveToHomePage(){
    this.navCtrl.push(HomePage); 
  }

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
      } else {
        this.productFound = false;
        this.toast.show(`Product not found`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
