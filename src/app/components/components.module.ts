import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormularioComponent } from './clientes/formulario/formulario.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginadorComponent } from './clientes/paginador/paginador.component';
import {MatDatepickerModule,} from '@angular/material/datepicker';
//import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './login/login.component';
import { DetalleFacturaComponent } from './clientes/detalle-factura/detalle-factura.component';
import { FacturasComponent } from './clientes/facturas/facturas.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';





@NgModule({
  declarations: [
    DirectivaComponent,
    ClientesComponent,
    FormularioComponent,
    PaginadorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent


  ],
  exports:[
    DirectivaComponent,
    ClientesComponent,
    FormularioComponent


  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDatepickerModule,
  //  MatNativeDateModule,
    MatMomentDateModule,
    //Modulos para utilizar el autocompplete
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule

  ]
})
export class ComponentsModule { }
