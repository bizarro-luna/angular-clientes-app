import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import Swal from 'sweetalert2';
import {catchError } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,
  private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {



  //Este es para cuando responde el back end
   return next.handle(req).pipe(

     catchError(e =>{

       //Cuando no esta autenticado
       if(e.status==401){

         //Caundo expira y es invalido la sesion limpia el
         //token anterior para que le loguie otra ves
         if(this.authService.isAuthenticated()){
           this.authService.logout();
         }

         this.router.navigate(['/login']);

       }

       //Cuando no esta autorizado
       if(e.status==403){
         Swal.fire(`Acceso denegado`,`Hola ${this.authService.usuario.username} no tienes acceso a este recurso camara perro`,
         'warning');
         this.router.navigate(['/clintes']);

       }

       return throwError(e);
     })


   );

  }
}
