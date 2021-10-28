import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {


  ngOnInit(): void {
     console.log('Que onda loco');
  }
  title = 'Bienvenido a angular';

  curso:string='Curso Spring 5 & Angular que onda loco';
  profesor:string='Hector Luna';

  etiquetas:string[]=[this.curso,this.profesor];


}
