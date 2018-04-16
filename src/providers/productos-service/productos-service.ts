import { Injectable } from '@angular/core';
import { Producto } from '../../model/producto';
import { CustomStorage } from '../../utils/CustomStorage';



/*
  Generated class for the ProductosServiceProvider provider.

  See http+s://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosServiceProvider {
  productos:Producto[];
  totalAPagar:number;
  constructor() {
    this.productos = [];
    this.totalAPagar = 0;
  }

  agregarProducto(producto:Producto){
    this.totalAPagar = this.totalAPagar + producto.precio;
    let indiceEncontrado = this.productos.findIndex(x => { return x.id == producto.id; }); 
    if(indiceEncontrado == -1){
      producto.cantidad = 1;
      this.productos.push(producto);
    }else{
      this.productos[indiceEncontrado].cantidad ++;
    }    
  }
  listarProductos(){
    return this.productos;
  }
  guardarProductos(){
    CustomStorage.set("Productos", ""+this.productos);
  }

  guardarTotalAPagar(){
    CustomStorage.set("PrecioTotal",""+this.totalAPagar)
  }

  quitarProducto(id:number){
    for(let i=0;i<this.productos.length;i++){
      if(this.productos[i].id==id){
        this.productos.splice(i,1);
        break;
      }
    }
  }
}
