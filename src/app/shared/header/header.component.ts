import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }


  authServicio=this.authService;




  logout():void{
    Swal.fire(`Login`,`${this.authServicio.usuario.username} ha cerrado session con exito `,
    'success');
      this.router.navigate(['/login']);
    this.authService.logout();

  }



}
