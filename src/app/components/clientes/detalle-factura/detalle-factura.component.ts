import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Facturas } from 'src/app/facturas/models/facturas';
import { DetalleFacturaService } from 'src/app/services/detalle-factura.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styles: [
  ]
})
export class DetalleFacturaComponent implements OnInit {

  factura!:Facturas;
  titulo:string='Factura';

  constructor(private facturaService:DetalleFacturaService,
  private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params=>{

      let id = +params.get('id')!;

      this.facturaService.getFactura(id).subscribe( factura => {
        this.factura= factura;
      });


    });
  }








}
