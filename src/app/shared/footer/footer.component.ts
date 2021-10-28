import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/interfaces/Interfaces';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls:['./footer.component.css']
})
export class FooterComponent implements OnInit {

  autor:Autor={nombre:'Hector', apellido:'Luna'};

  constructor() { }

  ngOnInit(): void {
  }

}
