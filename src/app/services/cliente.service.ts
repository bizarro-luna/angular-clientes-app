import { Injectable } from '@angular/core';
import { formatDate,DatePipe } from '@angular/common';
import { Cliente } from '../interfaces/Interfaces';
import {Observable,throwError} from 'rxjs';
import {map,catchError,tap } from 'rxjs/operators';
import { HttpClient ,HttpEvent,HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { Router} from '@angular/router';
import { Region } from '../interfaces/region';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private _baseUrl=environment.baseApiUrl;

//Con el interceptor envia el contenido con json
//  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient,private router:Router) { }

/*  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }

    return this.httpHeaders;
  }*/


  /**
   * Se obtienen las regiones
   * @returns 
   */
  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(this._baseUrl+'/api/clientes/regiones');
  }


  getClientes(page:number):Observable<any>{
    const url=`${this._baseUrl}/api/clientes/page/${page}`;
    return this.http.get(url).pipe(
      tap( (response :any) => {

        (response.content as Cliente[]).forEach( c => console.log(c.nombre));
      }),
      map( (response:any) =>{

           (response.content as Cliente[]).map(cliente=>  {
            cliente.nombre = cliente.nombre.toUpperCase();

            //let datePipe= new DatePipe('es-Mx');
            //formatDate(cliente.createAt!, 'dd-MM-yyyy','en-US')
            //datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy')
            //cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy') || '';
            return cliente;
          });

          return response;
       }
    ),
    tap(response =>{
      console.log("TAP 2**********");
      (response.content as Cliente[] ).forEach(cliente => {
        console.log(cliente.nombre);
      });
    })



    );
  }


   /**
   * 
   * @param page 
   * @param size 
   * @returns 
   */
    listarPaginado(page:string,size:string):Observable<any>{
      /// para hacer esto alumnos/pagina?page=0&size=6
      const params = new HttpParams().set('page',page)
                                     .set('size',size);
      return this.http.get<any>(`${this._baseUrl}/api/clientes/page`,{params:  params});
    }


  crear(cliente:Cliente):Observable<Cliente>{
    const url=`${this._baseUrl}/api/clientes`;
    return this.http.post(url,cliente).pipe(

      map((response:any) =>response.cliente as Cliente  ),

      catchError( e => {

        //this.metodoErrorConexion(e);


        if(e.status===400){
          return throwError(e);
        }

        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        //Swal.fire(`${e.error.mensaje}`,`${e.error.error.message}`,
        //'error');
        return throwError(e);
      })
    );
  }

  getCliente(id:number):Observable<Cliente>{
    const url=`${this._baseUrl}/api/clientes/${id}`;
    return this.http.get<Cliente>(url)
    .pipe(
      catchError( e=> {
        if(e.status!=401 && e.error.mensaje){
          this.router.navigate(['/clientes'])
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  update(cliente:Cliente):Observable<any>{
  const url=`${this._baseUrl}/api/clientes/${cliente.idCliente}`;
    return this.http.put<any>(url,cliente)
    .pipe(
      catchError( e => {

        if(e.status==400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  eliminar(id:number):Observable<Cliente>{
    const url=`${this._baseUrl}/api/clientes/${id}`;
    return this.http.delete<Cliente>(url).pipe(
      catchError( e => {
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );

  }




  subirFoto(archivo:File,id:number):Observable<HttpEvent<{}>>{
    let formData= new FormData();

    formData.append("archivo",archivo);
    formData.append("id",id.toString());
    const url=`${this._baseUrl}/api/clientes/upload`;

    /*let httpHeader= new HttpHeaders();
    let token= this.authService.token;
    if(token!=null){
      httpHeader= httpHeader.append('Authorization','Bearer '+token);
    }¨*/

    const req= new HttpRequest('POST',url,formData,{
      reportProgress:true
      //headers:httpHeader
    });
    return this.http.request(req);

    }


  metodoErrorConexion(e:any){

  }













}
