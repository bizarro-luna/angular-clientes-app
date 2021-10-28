import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { Facturas } from 'src/app/facturas/models/facturas';
import { ItemFactura } from 'src/app/facturas/models/item-factura';
import { Producto } from 'src/app/facturas/models/producto';
import { ClienteService } from 'src/app/services/cliente.service';
import { DetalleFacturaService } from 'src/app/services/detalle-factura.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: [
  ]
})
export class FacturasComponent implements OnInit {


  titulo="Nueva factura";
  factura:Facturas= new Facturas();

  autoComplete = new FormControl();
  productos: string[] = ['Mesa', 'Silla', 'Sony','Samsung'];
  productosFiltrados!: Observable<Producto[]>;

  constructor(private clienteService:ClienteService, private activatedRoute:ActivatedRoute,
  private facturaService:DetalleFacturaService,
  private router:Router) { }

  ngOnInit(): void {
    //Para buscar el cliente que se obtoene en el link
    this.activatedRoute.paramMap.subscribe(params => {
      let idCliente= +params.get('clienteId')!;
      this.clienteService.getCliente(idCliente).subscribe(cliente =>{
        this.factura.cliente= cliente;
      });

    });

    this.productosFiltrados = this.autoComplete.valueChanges
      .pipe(
        //Antes de seguir con el flatmap se obtiene el valor del obteto producto
        map(value => typeof value==='string'? value : value.nombre  ),
        flatMap(value => value? this._filter(value):[])
      );
  }

  private _filter(value: string):Observable<Producto[]> {
   const filterValue = value.toLowerCase();
   return this.facturaService.filtrarProdcustos(filterValue);
 }

  /*
   *Mostrar el nombre del producto en el autocomplete
  */
  mostrarNombre(producto?:Producto):string{

    return producto? producto.nombre!:'';
  }

  seleccionarProducto(event:MatAutocompleteSelectedEvent):void{
    let producto= event.option.value as Producto;
    console.log(producto);

    if(this.existeItem(producto.idProducto!)){
      this.incrementaCantidad(producto.idProducto!);
    }else{
      let nuevoItem = new ItemFactura();
      nuevoItem.producto= producto;
      this.factura.items!.push(nuevoItem);
    }


    this.autoComplete.setValue('');
    event.option.focus();
    event.option.deselect();


  }


  actualizarCantidad(id:number,event:any):void{

    let cantidad:number= event.target.value as number;

    if(cantidad==0){
      return  this.eliminarItemFactura(id);
    }
                                           //El map es para modificar algun valor del items
    this.factura.items= this.factura.items!.map((item:ItemFactura) =>{
       if(id===item.producto!.idProducto){
         item.cantidad=cantidad;
       }
       return item;
    });



  }


  /*
    Metodo para incrementar la cantidad si el porducto ya existe en la tabla
  */
  existeItem(id:number):boolean{

    let existe=false;

    this.factura.items!.forEach((item:ItemFactura) =>{

      if(id===item.producto!.idProducto){
        existe=true;
      }

    });

    return existe;
  }


 /*
 *Metodo para incrementar la cantidad del item cuando sea cambia el valor
 */
  incrementaCantidad(id:number):void{
                                          //El map es para modificar algun valor del item
    this.factura.items= this.factura.items!.map((item:ItemFactura) =>{
       if(id===item.producto!.idProducto){
         ++item.cantidad;
       }
       return item;
    });

  }

  /*
  *Metodo para eliminar una factura de los itemsFactura
  */
  eliminarItemFactura(id:number):void{
                                        //Para filtrar la informacion y te devulva solo lo solicitado
    this.factura.items= this.factura.items!.filter((item:ItemFactura) => id!== item.producto?.idProducto  );

  }


  /*
  *Metodo para crear una factura
  */
  crearFactura(facturaForm:any){


    if(this.factura.items!.length==0){
          this.autoComplete.setErrors({'invalid':true});
    }

    if(facturaForm.form.valid && this.factura.items!.length >0){
      console.log(this.factura);
      this.facturaService.crearFactura(this.factura).subscribe(factura => {
        Swal.fire(this.titulo,`Factura ${factura.descripcion} creada con éxito!`,'success');
        this.router.navigate(['/facturas',factura.idFactura])
      });
    }



  }







}
