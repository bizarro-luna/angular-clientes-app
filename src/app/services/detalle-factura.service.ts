import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facturas } from '../facturas/models/facturas';
import { Producto } from '../facturas/models/producto';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {

  private _baseUrl:string=environment.baseApiUrl+'/api/facturas';

  constructor(private http:HttpClient) { }

  /*
  Metodo para obtener la factura por id
  */
  getFactura(id:number):Observable<Facturas>{

    return this.http.get<Facturas>(`${this._baseUrl}/${id}`);
  }


  /*
    *Metodo para eliminar factura
  */
  eliminar(id:number):Observable<void>{
    return this.http.delete<void>(`${this._baseUrl}/${id}`);
  }

  /*
   *Metodo para filtrar los productos
  */
  filtrarProdcustos(termino:string):Observable<Producto[]>{

    return this.http.get<Producto[]>(`${this._baseUrl}/filtrar-productos/${termino}`);
  }

  crearFactura(factura:Facturas):Observable<Facturas>{
    return this.http.post<Facturas>(this._baseUrl,factura);
  }

}
