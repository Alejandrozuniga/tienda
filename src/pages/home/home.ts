import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { ProductosServiceProvider } from '../../providers/productos-service/productos-service';
import { Producto } from '../../model/producto';
import { ApiqrProvider } from '../../providers/apiqr/apiqr';
import { CommonProvider } from '../../providers/common/Common';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public productosService: ProductosServiceProvider,
    public ApiQrService: ApiqrProvider,
    public commonProvider:CommonProvider
  ) {
  }

  verDetalles() {
    this.barcodeScanner.scan().then((data) => {

      let infoProducto = JSON.parse(data.text);

      if (infoProducto.idProducto != undefined) {
    
        this.ApiQrService.getProductById(infoProducto.idProducto).subscribe((response:any) => {
                  console.log("response", response);
                        
        });
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
