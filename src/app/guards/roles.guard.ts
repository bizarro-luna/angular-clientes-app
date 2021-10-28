import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(private authService:AuthService,
  private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authService.isAuthenticated()){
          this.router.navigate(['/login']);
        return false;
      }

      let role=route.data['role'] as string;
      console.log(role);
      if(this.authService.hasRole(role)){
        return true;
      }
      Swal.fire(`Acceso denegado`,`Hola ${this.authService.usuario.username} no tienes acceso a este recurso`,
      'warning');
      this.router.navigate(['/clintes']);


    return false;
  }

}
