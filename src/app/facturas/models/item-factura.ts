import { Producto } from "./producto";

export class ItemFactura {

  idItem?:number;
  cantidad:number=1;
  producto?:Producto;
  importe?:number;


  //los get se utilizan para indicar como una variable
  get total():number{
    return  this.importe =  this.cantidad*this.producto!.precio!;
  }

}
