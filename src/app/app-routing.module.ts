import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DetalleFacturaComponent } from './components/clientes/detalle-factura/detalle-factura.component';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';
import { FacturasComponent } from './components/clientes/facturas/facturas.component';
import { FormularioComponent } from './components/clientes/formulario/formulario.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

const routes: Routes = [

  //{ path:'directivas',component:DirectivaComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'clientes/page/:page',component:ClientesComponent},
  {path:'clientes/form',component:FormularioComponent,canActivate:[AuthGuard,RolesGuard],data:{role:'ROLE_ADMIN'} },
  {path:'clientes/form/:id',component:FormularioComponent,canActivate:[AuthGuard,RolesGuard],data:{role:'ROLE_ADMIN'}},
  {path:'login',component:LoginComponent},
  {path:'facturas/:id',component:DetalleFacturaComponent,canActivate:[AuthGuard,RolesGuard],data:{role:'ROLE_USER'}},
  {path:'facturas/form/:clienteId',component:FacturasComponent,canActivate:[AuthGuard,RolesGuard],data:{role:'ROLE_ADMIN'}},
  {path:'**',redirectTo:'/clientes'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
