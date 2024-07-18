import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Diccionario, optionSelector } from '../../interfaces/shared.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-analitica-diagnostica',
  templateUrl: './analitica-diagnostica.component.html',
  styleUrls: ['./analitica-diagnostica.component.css']
})
export class AnaliticaDiagnosticaComponent implements OnInit {

  form_data: FormGroup;

  carreraOption: optionSelector[] = [
    {
      option: 'Ingeniería Catastral y Geodesia',
      value: 'catastral'
    },
    {
      option: 'Ingeniería de Sistemas',
      value: 'sistemas'
    },
    {
      option: 'Ingeniería Eléctrica',
      value: 'electrica'
    },
    {
      option: 'Ingeniería Electrónica',
      value: 'electronica'
    },
    {
      option: 'Ingeniería Industrial',
      value: 'industrial'
    }
  ]

  semestreOption: optionSelector[] = [
    {
      value: 1,
      option: 'Primer Semestre'
    },
    {
      value: 2,
      option: 'Segundo Semestre'
    },
    {
      value: 3,
      option: 'Tercer Semestre'
    },
    {
      value: 4,
      option: 'Cuarto Semestre'
    },
    {
      value: 5,
      option: 'Quinto Semestre'
    },
    {
      value: 6,
      option: 'Sexto Semestre'
    },
    {
      value: 7,
      option: 'Septimo Semestre'
    },
    {
      value: 8,
      option: 'Octavo Semestre'
    },
    {
      value: 9,
      option: 'Noveno Semestre'
    },
    {
      value: 10,
      option: 'Decimo Semestre'
    },
  ]

  variablesSemestre: Diccionario[] = []
  variablesArr: Diccionario[] = [];


  isLoading: boolean = false;
  textLoading: string = 'Por favor espere';

  isOpenVariable: boolean = false;
  isOpenGraphics: boolean = false;

  contadorVariables: number = 0;

  images: string = '';

  csv: any[];

  constructor(private fb: FormBuilder, private service: DataService) {
    this.form_data = this.fb.group({
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
    })

  }

  ngOnInit(): void {
  }


  changeContadorVariable($event: Event,variableName:Diccionario){
    let value: boolean = ($event.target as HTMLInputElement).checked;
    if(value){
      this.contadorVariables++;
      this.variablesArr.push(variableName)
    }
    else{
      this.contadorVariables--;
      this.variablesArr = this.variablesArr.filter(variable=>{return variable!=variableName})
    }
  }

  liveSearch($event: Event){
    let filter: string = ($event.target as HTMLInputElement).value.toString();

    let variablesDiv: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.getElementsByName("variablesDiv");

    variablesDiv.forEach(div =>{
        let string: String = div.getAttribute("nombre") == '' ? '' : <String>div.getAttribute("nombre");
        if(string.toLowerCase().indexOf(filter.toLowerCase()) != -1){
          div.classList.remove("hide")
          div.classList.add("d-flex")
        }else{
          div.classList.add("hide")
          div.classList.remove("d-flex")
        }
    })
  }

  selectAllVariables($event: Event){
    let value: boolean = ($event.target as HTMLInputElement).checked;
    let htmlObj: NodeListOf<HTMLInputElement> = <NodeListOf<HTMLInputElement>> document.getElementsByName("variablesSelect");
    if(value){
      this.contadorVariables = this.variablesSemestre.length;
      this.variablesArr = this.variablesSemestre
      htmlObj.forEach(e=>{e.checked = true})
    }
    else{
      this.contadorVariables = 0;
      this.variablesArr = []
      htmlObj.forEach(e=> {e.checked=false})
    }
  }

  async seleccionarVariables($event: Event){
    
    // let nn: any = this.carreraOption.find(e => e.value == this.form_data.controls['carrera'].value)
    // let carrera: optionSelector = nn
    // let semestre : number = parseInt(($event.target as HTMLSelectElement).value);
    let carrera: string = this.form_data.controls['carrera'].value
    let semestre: string = this.form_data.controls['semestre'].value

    if((carrera !== '' && carrera !== undefined && carrera !== null) && (semestre !== '' && semestre !== undefined && semestre !== null)){

      this.isLoading = true;
      this.textLoading = 'Espera un momento, estamos consultando las variables de la carrera y semestre';

      await this.service.getVariablesDiagnostica(carrera, parseInt(semestre)).subscribe({
        next: (res: any) => { 
          this.variablesSemestre = res;
          this.variablesArr = []
          this.isOpenVariable = true
        },
        error: err => {
          this.isLoading = false;
          this.variablesSemestre = []
          this.variablesArr = []
        },
        complete: ()=>{
          this.isLoading = false;
        }
      })
    }

  }

  async postDiagnostica(){

    this.images = ''
    this.isLoading = true;
    this.textLoading = 'Espera un momento estamos generando las transformaciones';

    let carrera: string = this.form_data.controls['carrera'].value
    let semestre: string = this.form_data.controls['semestre'].value

    let columnas: string[] =  [];
    this.variablesArr.forEach(e =>{
      columnas.push(e.codigo)
    })

    let form = {
      "data": columnas,
      "carrera": carrera,
      "semestre": parseInt(semestre)
    }


    await this.service.postDiagnostica(form).subscribe(
      {
        next: (res: any) => {
          this.images = res.image;
          this.csv = res.dataCSV.data
        },
        error: err => {
          console.error(err)
          this.isLoading = false;
        },
        complete: ()=>{
          this.isLoading = false;
          this.isOpenGraphics = true;
        }
      }
    )
  }

  async construirCSV(){

    this.isLoading = true;
    this.textLoading = 'Espera un momento, estamos generando el archivo .csv';

    let csvContent: string = ''; 

    Object.keys(this.csv[0]).forEach((key:string) =>{
      csvContent += key + ';'
    })
    csvContent += '\n'

    await this.csv.forEach(e =>{
      Object.keys(e).forEach((key:string) =>{
        csvContent += e[key] + ';'
      })
      csvContent += '\n'
    })

    let data = new Blob([csvContent], {type: 'text/csv'})

    this.descargarCSV2(data, 'MyReport')

    this.isLoading = false;
    
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
