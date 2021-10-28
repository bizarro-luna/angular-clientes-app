import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/usuarios/usuario';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  titulo='Iniciar Sesion'
  usuario:Usuario;

  constructor(private authService:AuthService,private router:Router) {
  this.usuario=new Usuario(); }

  ngOnInit(): void {

    if(this.authService.isAuthenticated()){
      Swal.fire(`Login`,`Hola ${this.authService.usuario.username} ya estas autenticado`,
      'info');
      this.router.navigate(['/clientes'])
    }


  }

  login():void{

    //console.log(this.usuario);
    if(this.usuario.username==null || this.usuario.password==null){

      Swal.fire(`Error Login`,`Usuario o password vacios`,
      'error');

      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        console.log(response);


        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario= this.authService.usuario;
        this.router.navigate(['/clientes'])
        Swal.fire(`Login`,`Hola ${usuario.username}, has iniciado sesion con exito`,
        'success');
      },
      err=>{
        if(err.status==400){
          Swal.fire(`Error Login`,`Usuario o clave incorrectas!`,
          'error');
        }

      }
    );
  }

}
