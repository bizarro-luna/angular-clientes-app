import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/Interfaces';
import { Region } from 'src/app/interfaces/region';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [
  ]
})
export class FormularioComponent implements OnInit {


  titulo:string='Crear Cliente';

  @ViewChild('miFormulario')
  miFormulario!:NgForm;

  errores:string[]=[];




  //Esto tambien podria ser una clase de tipo Cliente
  cliente:Cliente={
    nombre:'',
    apellido:'',
    email:''
  };

  regiones:Region[]=[];


  constructor(private clienteServicio:ClienteService,private router:Router,
    private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente():void{

    this.activatedRoute.params.subscribe(params=>{
      let id=params['id'];
      if(id){
        this.clienteServicio.getCliente(id).subscribe( cliente=>this.cliente=cliente );
      }
    });

    this.clienteServicio.getRegiones().subscribe(regiones => this.regiones= regiones);
  }

  crear():void{
    this.cliente.facturas=[];
    console.log("Metodo de crear");
    console.log(this.miFormulario.value);
    const{nombre,apellido,email,createAt,region}=this.miFormulario.value;
    //console.log(nombre,apellido,email,createAt);
    this.cliente.nombre=nombre;
    this.cliente.apellido=apellido;
    this.cliente.email=email;
    this.cliente.createAt=createAt;
    this.cliente.region=region;

    this.clienteServicio.crear(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo Cliente',`El cliente ${cliente.nombre} ha sido creado con éxito `,
        'success');

    },
    err=>{
    this.errores=err.error.errors as string[]
    console.log('Codigo de error desde el back end '+ err.status);
    console.error(this.errores);
  }
  );

  }


  actualizar():void{
    console.log(this.miFormulario.value);
     this.cliente.facturas=[];
      const{nombre,apellido,email,createAt,region}=this.miFormulario.value;
      this.cliente.nombre=nombre;
      this.cliente.apellido=apellido;
      this.cliente.email=email;
      this.cliente.createAt=createAt;
      this.cliente.region=region;


    this.clienteServicio.update(this.cliente)
    .subscribe( json=>{
      this.router.navigate(['/clientes']);
      Swal.fire('Cliente Actualizado',`${json.mensaje}: ${json.cliente.nombre} `,
      'success');
      },
      err=>{
      this.errores=err.error.errors as string[]
      console.log('Codigo de error desde el back end '+ err.status);
      console.error(this.errores);
    });
  }

  compararRegion(o1:Region, o2:Region):boolean{

    if(o1===undefined && o2=== undefined){
      return true;
    }

    if((o1 ===undefined || o2===undefined)){
      return false;
    }



    return  o1.idRegion===o2.idRegion;



  }

}
