import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormPractico, optionSelector } from '../../interfaces/shared.interface';

@Component({
  selector: 'app-practico-grupal',
  templateUrl: './practico-grupal.component.html',
  styleUrls: ['./practico-grupal.component.css']
})
export class PracticoGrupalComponent implements OnInit {

  @Output() loading = new EventEmitter<boolean>();

  form: FormGroup
  carreraOption: optionSelector[] = [
    {
      value: 'catastral',
      option: 'Ingeniería Catastral y Geodesia'
    },
    {
      value: 'sistemas',
      option: 'Ingeniería de Sistemas'
    },
    {
      value: 'electrica',
      option: 'Ingeniería Eléctrica'
    },
    {
      value: 'electronica',
      option: 'Ingeniería  Electrónica'
    },
    {
      value: 'industrial',
      option: 'Ingeniería Industrial'
    }
  ]

  modeloOption: optionSelector[] = [
    {
      value: 'clasificacion',
      option: 'Clasificación'
    },
    {
      value: 'regresion',
      option: 'Regresión'
    }
  ]

  semestreOption: number[] = []

  dataCSV: any[] = []


  constructor(private fb: FormBuilder, private service: DataService) {
    this.form = this.fb.group({
      carrera: [null || undefined, Validators.required],
      semestre: [null || undefined, Validators.required],
      tipoModelo: [null || undefined, Validators.required],
    })
  }

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.semestreOption.push(i);
    }
  }

  async onSubmit(){
    this.loading.emit(true)
    await this.service.getDataGrupal(<IFormPractico>this.form.value).subscribe({
      next: (res: any) => {
        console.log(res)
        this.dataCSV = res.dataTransformacion
      },
      error: (err: any) => {
        console.error(err.error.message)
        console.error(err)
        this.loading.emit(false)
      },
      complete: () => {
        this.construirCSV()
        this.loading.emit(false)
      }
    })
  }

  limpiarForm() {
    this.form.reset();
  }

  async construirCSV(){

    this.loading.emit(true)

    let csvContent: string = ''; 

    let header: any = this.dataCSV[0];

    Object.keys(header).forEach((key:string) =>{
      // csvContent += this.dataCSV[key as keyof typeof header] + ';'
      csvContent += key + ';'
    })

    csvContent += '\n'

    // console.log(csvContent)
    
    await this.dataCSV.forEach(e =>{
      Object.keys(e).forEach((key:string) =>{
        csvContent += e[key as keyof typeof e] + ';'
      })
      csvContent += '\n';
    })

    let data = new Blob([csvContent], {type: 'text/csv'})

    this.descargarCSV2(data, 'MyReport')

    this.loading.emit(false)
    
  }
  
  descargarCSV2(blob: Blob, fillname: string){

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = fillname
    a.click()
  }

}
