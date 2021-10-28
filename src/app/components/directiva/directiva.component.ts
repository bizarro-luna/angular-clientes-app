import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styles: [
  ]
})
export class DirectivaComponent {

  listaCurso:string[]=['TypeScript','JavaScript','Java SE','C#','PHP'];

  habilitar:boolean=true
  etiquetaBoton:string='Ocultar';

  constructor() { }

  ocultar():void{
    this.habilitar=(this.habilitar==true)?false:true;
  }


}
