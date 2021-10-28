import { Cliente } from "src/app/interfaces/Interfaces";
import { ItemFactura } from "./item-factura";

export class Facturas {

  idFactura?:number;
  descripcion?:string;
  observacion?:string;
  fechaCreacion?:string;
  items?:Array<ItemFactura>=[];
  total?:number;
  cliente?:Cliente;


  calcularGranTotal():number{
    this.total=0;

    this.items?.forEach((item:ItemFactura) => {
        this.total! += item.total;
    });

    return this.total;
  }



}
