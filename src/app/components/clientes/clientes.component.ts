import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/Interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import {tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DetalleService } from 'src/app/services/detalle.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [

  ]
})
export class ClientesComponent implements OnInit  {

  clientes:Cliente[]=[];
  clienteSeleccionado!:Cliente;
  paginador:any;

  constructor(private servicioCliente:ClienteService,private activatedRoute:ActivatedRoute,
  private detallseServicio:DetalleService, private authService:AuthService) {}

  authServicio:AuthService=this.authService;

   baseUrl:string=environment.baseApiUrl;

   baseUrlImagen:string=environment.baseApiUrl+'/api/uploads/img/';

   /**
   * Variables del paginator
   */
  totalRegistros:number=0;
  paginaActual:number=0;
  totalPorPagina:number=2;
  pageSizeOptions:number[]=[2,4,8,12,16,20,100];

  @ViewChild(MatPaginator)  paginator!:MatPaginator;
  progressBarPaginador=false;


  ngOnInit(): void {
    /*this.activatedRoute.paramMap.subscribe(params =>{
      let page:number = +params.get('page')!;

      if(!page){
        page=0;
      }

      this.servicioCliente.getClientes(page).pipe(
        tap( response =>{
          console.log("Tap 3");

          (response.content as Cliente[]) .forEach( cliente =>{
              console.log(cliente.nombre);
          });
        })
      ).subscribe(
        response =>{
          this.clientes= response.content;
          this.paginador= response;
        }
      );

    });*/
    this.initPaginador();

    this.detallseServicio.notificarUpload.subscribe(cliente =>{
       this.clientes=  this.clientes.map(clienteOriginal => {
        if(cliente.idCliente===clienteOriginal.idCliente){
          clienteOriginal.fotoHashCode=cliente.fotoHashCode;
        }
        return clienteOriginal;
      });
      //this.initPaginador();
    });

  }

  paginar(event:PageEvent):void{
    this.progressBarPaginador=true;
    this.paginaActual=event.pageIndex;
    this.totalPorPagina=event.pageSize;
    this.initPaginador();
    this.progressBarPaginador=false;
  }


  eliminar(cliente:Cliente):void{

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Seguro de elimnar al cliente ${cliente.nombre} ${cliente.apellido} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioCliente.eliminar(cliente.idCliente!)
        .subscribe( () => {
          Swal.fire(
            'Eliminado!',
             `El cliente  ${cliente.nombre} ha sido eliminado con exito . `,
            'success'
          );

            this.clientes=this.clientes.filter(cli => cli!==cliente);

        });




      }
    });

  }


  abrirModal(cliente:Cliente){
    this.clienteSeleccionado=cliente;
    this.detallseServicio.abrirModal();

  }

   /**
     * Metodo para el paginator
     */
    initPaginador(){
      this.servicioCliente.listarPaginado(this.paginaActual.toString(),this.totalPorPagina.toString()).subscribe(p=>{
  
        this.clientes=p.content as Cliente[];
        this.totalRegistros=p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel="Registros por página";
        this.paginator._intl.lastPageLabel='Ultima página';
        this.paginator._intl.nextPageLabel='Siguiente página';
        this.paginator._intl.previousPageLabel='Anterior página';
        this.paginator._intl.firstPageLabel='Primera página';
        
  
      });
    }



}
