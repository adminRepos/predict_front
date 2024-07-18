import { Component, OnInit } from '@angular/core';
import { IFormPracticoVariables, optionSelector } from '../../interfaces/shared.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-seleccion-variables',
  templateUrl: './seleccion-variables.component.html',
  styleUrls: ['./seleccion-variables.component.css']
})
export class SeleccionVariablesComponent implements OnInit {

  form_data: FormGroup;

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

  modelosOption: optionSelector[] = []

  contadorVariables: number = 0;

  variablesArr: optionSelector[] = [];
  variablesArrTemp: optionSelector[] = [];

  variables: IFormPracticoVariables[] = []

  send: boolean = false;
  
  next: number = 0

  datos: any
  datosTemp: any

  isLoading: boolean = false;
  textLoading: string = 'Por favor espere';

  constructor(private fb: FormBuilder, private service: DataService) {
    this.form_data = this.fb.group({
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }


  getData(){
    let form: any = this.form_data.value
    if(
      form.carrera !== '' && form.carrera !== null &&
      form.semestre !== '' && form.carrera !== null
    ){
      form = null
      let {carrera, semestre} = this.form_data.value
      form = {
        "carrera": carrera,
        "semestre": semestre
      }
      this.isLoading = true;
      this.textLoading = 'Por favor espere, esto puede tardar unos minutos'
      this.modelosOption = []

      this.service.getDataSeleccion(form).subscribe({
        next: (res: any) => {
          this.variables = res.variables
          this.datos = res.datos
          let item = this.datos[0]
          Object.keys(item).forEach((key: string) =>{
            console.log(key.toLowerCase().trim());

            if(key.toLowerCase().trim() !== 'variable' && key.toLowerCase().trim() !== 'incidencia') this.modelosOption.push({option: key, value: key})
          })
          this.next = 1;
          this.send = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err)
          console.error(err.message)
          this.next = 0
          this.isLoading = false;
          this.send = false;
        }, 
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

  sendData(){
    this.datosTemp = this.datos
    this.variablesArrTemp= this.variablesArr
    this.next = 2
    this.send = true;
  }

  liveSearch($event: Event){
    let filter: string = ($event.target as HTMLInputElement).value.toString();

    let variablesDiv: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.getElementsByName("variablesDiv");

    variablesDiv.forEach(div =>{
        // console.log(div.getAttribute("nombre"))
        let string: String = div.getAttribute("nombre") == '' ? '' : <String>div.getAttribute("nombre");
        console.log(string);
        
        if(string.toLowerCase().indexOf(filter.toLowerCase()) != -1){
          console.log(string.toLowerCase().indexOf(filter.toLowerCase()));
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
      this.contadorVariables = this.modelosOption.length;
      this.variablesArr = this.modelosOption
      htmlObj.forEach(e=>{e.checked = true})
    }
    else{
      this.contadorVariables = 0;
      this.variablesArr = []
      htmlObj.forEach(e=> {e.checked=false})
    }
  }

  changeContadorVariable($event: Event, variableName:optionSelector){
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

  getItem(item: any, key: string): string {
    let str: string = ''
    Object.keys(item).forEach(e =>{
      if(e == key) str = item[e]
    })
    return str
  }

  getIncidencia(item: any): number {
    let contador: number = 0
    this.variablesArrTemp.forEach(e =>{
      Object.keys(item).forEach(key =>{
        if(e.value == key){
          contador = item[key] == 0 ? contador : contador + 1;
        }
      })
    })
    return contador
  }

  construirCSV(){

    this.isLoading = true;
    this.textLoading = 'Espera un momento, estamos generando el archivo .csv';

    let csvContent: string = ''; 

    console.log(this.variablesArrTemp)

    let strings : string[] = [];
    
    csvContent += "variable;"

    this.variablesArrTemp.forEach(e =>{
      strings.push(e.option)
      csvContent += e.option + ";"
    })

    csvContent += "incidencia"

    csvContent.substring(0, (csvContent.length - 1))

    csvContent += '\n';
    
    this.datosTemp.forEach((e:any) =>{
      let incidencia = 0
      csvContent += e.variable + ";";
      Object.keys(e).forEach(key =>{
        if (strings.includes(key)){
          csvContent += e[key] + ';'
          if(e[key] == 1) incidencia++;
        }
      })
      csvContent += String(incidencia);
      // csvContent.substring(0, (csvContent.length - 1))
      csvContent += '\n';
    })

    console.log(csvContent)

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
