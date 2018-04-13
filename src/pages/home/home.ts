import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { ProductosServiceProvider } from '../../providers/productos-service/productos-service';
import { Producto } from '../../model/producto';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public productosService: ProductosServiceProvider
  ) {
  }

  verDetalles() {
    this.barcodeScanner.scan().then(barcodeData => {
      let producto: any = JSON.parse(barcodeData.text);
      if (producto.id != undefined) {
        this.productosService.agregarProducto(producto);
      } else {
        alert("El qr ingresado no pertenece a un producto");
      }
    }).catch(err => {
      alert("Error en el sistema " + err);
    });
  }


  guardarProductos() {
    this.productosService.guardarProductos();
  }

  quitarProducto(id: number) {

  }
}
