import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga-limpieza',
  templateUrl: './carga-limpieza.component.html',
  styleUrls: ['./carga-limpieza.component.css']
})
export class CargaLimpiezaComponent implements OnInit {

  selectorBar = ['Data','Convenciones','Historial de carga']

  selected:number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  changeSelector(index:number){
    this.selected = index
  }

}
