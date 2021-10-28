import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facturas } from 'src/app/facturas/models/facturas';
import { Cliente } from 'src/app/interfaces/Interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DetalleFacturaService } from 'src/app/services/detalle-factura.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo:string='Detalle Cliente'
  @Input() cliente!:Cliente;
  fotoSeleccionada!:File;
  progreso:number=0;
  //Un servicio se puede asignar a una variable para utilizarlo del lado del html
  servicio=this.detallseServicio;

  baseUrl=environment.baseApiUrl;

  constructor(private clienteServico:ClienteService, private activatedRoute:ActivatedRoute,
  private detallseServicio:DetalleService,private authService:AuthService,
  private facturaService:DetalleFacturaService) {
//  this.modal=this.detallseServicio.modal;
  }

  authServicio:AuthService=this.authService;

  ngOnInit(): void {
    /*this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id){
        this.clienteServico.getCliente(+id).subscribe( cliente => {
          this.cliente=cliente;
        });
      }
    });*/

  }

  /**
   Metodo para seleccionar la foto
  */
  seleccionarFoto(event:any){

    //console.log(event);
    this.progreso=0;
    if(event.target.files[0].type.indexOf('image')<0){
            Swal.fire(`Error seleccionar imagen`,`El archivo debe de ser de tipo imagen`,
            'error');
    }else{
        this.fotoSeleccionada=event.target.files[0];
        console.log(this.fotoSeleccionada)
    }
  }


  /**
    Metodo para subir foto del cliente
  */
  subirFoto(){

    if(!this.fotoSeleccionada){

      Swal.fire(`Error upload`,`La imagen no es valida`,
      'error');

    }else{

        this.clienteServico.subirFoto(this.fotoSeleccionada,this.cliente.idCliente!)
        .subscribe( event => {
          if(event.type===HttpEventType.UploadProgress){
            this.progreso= Math.round( (event.loaded/event.total!)*100);
          }else if(event.type===HttpEventType.Response){
            let response:any= event.body;
            this.cliente= response.cliente as Cliente;

            this.detallseServicio.notificarUpload.emit(this.cliente);

            Swal.fire(`Foto Enviada`,`${response.mensaje}`,
            'success');
          }
        });
      }
  }


  /*
   Cerrar la modal de foto y facturas
  */
  cerrarModal(){
    this.detallseServicio.cerrarModal();
    this.fotoSeleccionada!=null
    this.progreso=0;
  }


  /**
    Metodo para eliminar facturas
  */
  elimnarFactura(factura:Facturas):void{

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Seguro que desea elimnar la factura `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.facturaService.eliminar(factura.idFactura!)
        .subscribe( () => {
          Swal.fire(
            'Factura Eliminada!',
             `Factura ${factura.descripcion}  ha sido eliminado con exito . `,
            'success'
          );

            this.cliente.facturas=this.cliente.facturas!.filter(fac => fac!==factura);

        });




      }
    });
  }


















}
