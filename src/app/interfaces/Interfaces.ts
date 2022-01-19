import { Facturas } from "../facturas/models/facturas";
import { Region } from "./region";


export interface Autor{
  nombre:string;
  apellido:string;
}


export interface Cliente{
  idCliente?:number;
  nombre:string;
  apellido:string;
  createAt?:string;
  email:string;
  foto?:string;
  fotoHashCode?:number;
  region?:Region;
  facturas?:Facturas[];

}
