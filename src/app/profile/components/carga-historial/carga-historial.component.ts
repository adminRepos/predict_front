import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga-historial',
  templateUrl: './carga-historial.component.html',
  styleUrls: ['./carga-historial.component.css']
})
export class CargaHistorialComponent implements OnInit {

  historyData = {
    columns: ["Archivo cargado", "Hora y fecha de carga", "Nombre de usuario", "Tipo de información","Proceso de limpieza"],
    data: [
      ["data.xlsl", "01-12-2022", "Usuario 1", "data", "correcto"],
      ["data.xlsl", "01-12-2022", "Usuario 2", "data", "correcto"],
      ["data.xlsl", "01-12-2022", "Usuario 3", "Convenciones", "correcto"],
      ["data.xlsl", "01-12-2022", "Usuario 4", "data", "correcto"],
      ["data.xlsl", "01-12-2022", "Usuario 5", "Convenciones", "correcto"],
      ["data.xlsl", "01-12-2022", "Usuario 6", "Convenciones", "correcto"],
      ["data.xlsl", "01-12-2022", "Usuario 7", "data", "correcto"],
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
