import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { CarreraAnaliticaDiagnostica, DatosGraficas, Diccionario, optionSelector } from '../../interfaces/shared.interface';
import { DataService } from '../../services/data.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';


@Component({
  selector: 'app-transformaciones',
  templateUrl: './transformaciones.component.html',
  styleUrls: ['./transformaciones.component.css']
})
export class TransformacionesComponent implements OnInit {

  variablesSemestre: Diccionario[] = []

  variablesArr:Diccionario[] = [];

  carreraOption: CarreraAnaliticaDiagnostica[] = [
    {
      value: 1,
      option: 'Ingeniería Catastral y Geodesia',
      file: 'catastral'
    },
    {
      value: 2,
      option: 'Ingeniería de Sistemas',
      file: 'sistemas'
    },
    {
      value: 3,
      option: 'Ingeniería Eléctrica',
      file: 'electrica'
    },
    {
      value: 4,
      option: 'Ingeniería Electrónica',
      file: 'electronica'
    },
    {
      value: 5,
      option: 'Ingeniería Industrial',
      file: 'industrial'
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

  validations:{[key: string]: string|null} = {
    2: '',
    3: '',
    4: '',
    5: ''
  }

  form_data: FormGroup;

  contadorVariables: number = 0;

  variablesSeleccion: string = 'Seleccione'

  isOpenVariable: boolean = false;

  transformacionArr:string[] = [];

  contadorTransformaciones: number = 0;

  transformacionesSeleccion: string = 'Seleccione'

  isOpenTransformaciones: boolean = false;

  isOpenGraphics: boolean = false;

  isLoading: boolean = false;
  textLoading: string = 'Por favor espere';

  images: string[] = [];

  headerCSV: string[] = [];
  dataCSV: any[] = [];



  constructor(private fb: FormBuilder, private service: DataService) {

    this.form_data = this.fb.group({
      tipoCarrera: [''],
      semestre: [''],
      añoIngreso: [false],
      semestreIngreso: [false],
      estrato: [false],
      genero: [false],
      municipio: [false],
      localidad: [false],
      estandarizar: [false],
      reescalar: [false],
      normailzar: [false],
      estandarizacionRobusta: [false],
      transformacionBoxCox: [false],
      transformacionYeoJohnson: [false]
    })
    this.form_data.controls['tipoCarrera'].valueChanges.subscribe((data:string)=>{
      if(data){
        this.validations[2] = null
      }
      else{
        this.validations[2] = ''
      }
      this.form_data.controls['semestre'].setValue('')
      this.resetVariables()
      this.resetTransformaciones()
    })
    this.form_data.controls['semestre'].valueChanges.subscribe((data:string)=>{
      if(data){
        this.validations[3] = null
      }
      else{
        this.validations[3] = ''
      }
      this.resetVariables()
      this.resetTransformaciones()
    })

    this.form_data.controls['estandarizar'].valueChanges.subscribe((data:boolean)=>{
      let transformacionName = 'Estandarizar'
      this.changeContadorTransformaciones(data,transformacionName)
    })
    this.form_data.controls['reescalar'].valueChanges.subscribe((data:boolean)=>{
      let transformacionName = 'Reescalar'
      this.changeContadorTransformaciones(data,transformacionName)
    })
    this.form_data.controls['normailzar'].valueChanges.subscribe((data:boolean)=>{
      let transformacionName = 'Normailzar'
      this.changeContadorTransformaciones(data,transformacionName)
    })
    this.form_data.controls['estandarizacionRobusta'].valueChanges.subscribe((data:boolean)=>{
      let transformacionName = 'Estandarización robusta'
      this.changeContadorTransformaciones(data,transformacionName)
    })
    this.form_data.controls['transformacionBoxCox'].valueChanges.subscribe((data:boolean)=>{
      let transformacionName = 'Transformación Box-Cox'
      this.changeContadorTransformaciones(data,transformacionName)
    })
    this.form_data.controls['transformacionYeoJohnson'].valueChanges.subscribe((data:boolean)=>{
      let transformacionName = 'Transformación Yeo-Johnson'
      this.changeContadorTransformaciones(data,transformacionName)
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
    this.isLoading = true;
    this.textLoading = 'Espera un momento, estamos consultando las variables de la carrera y semestre';
    let nn: any = this.carreraOption.find(e => e.value == this.form_data.controls['tipoCarrera'].value)
    let carrera: CarreraAnaliticaDiagnostica = nn
    let semestre : number = parseInt(($event.target as HTMLSelectElement).value);
    

    await this.service.getVariablesTransformaciones(carrera.file, semestre).subscribe({
      next: (res: any) => { 
        this.variablesSemestre = res;
        this.variablesArr = []
        this.isOpenVariable = !this.isOpenVariable
      },
      error: err => {
        console.error(err)
        this.isLoading = false;
        this.variablesSemestre = []
        this.variablesArr = []
      },
      complete: ()=>{
        this.isLoading = false;
      }
    })
  }

  validacionVariables(name:string){
    return (this.contadorVariables>=4 && !this.form_data.controls[name].value)?'':null
  }

  resetVariables(){
    this.form_data.controls['añoIngreso'].setValue(false, { emitEvent: false })
    this.form_data.controls['semestreIngreso'].setValue(false, { emitEvent: false })
    this.form_data.controls['estrato'].setValue(false, { emitEvent: false })
    this.form_data.controls['genero'].setValue(false, { emitEvent: false })
    this.form_data.controls['municipio'].setValue(false, { emitEvent: false })
    this.form_data.controls['localidad'].setValue(false, { emitEvent: false })
    this.variablesArr = []
    this.isOpenVariable = false;
    this.variablesSeleccion = 'Seleccione'
    this.validations[4] = ''
    this.contadorVariables = 0;
  }

  changeContadorTransformaciones(transformacion:boolean,transformacionName:string){
    if(transformacion){
      this.contadorTransformaciones++;
      this.transformacionArr.push(transformacionName)
    }
    else{
      this.contadorTransformaciones--;
      this.transformacionArr = this.transformacionArr.filter(variable=>{return variable!=transformacionName})
    }
  }

  validacionTransformacion(name:string){
    return (this.contadorTransformaciones>=4 && !this.form_data.controls[name].value)?'':null
  }

  agregarTransformaciones(){
    if(this.transformacionArr.length>=1){
      this.transformacionesSeleccion = this.transformacionArr.join()
      this.isOpenTransformaciones = false;
      this.validations[5] = null;
      this.isOpenGraphics = false;
    }
  }

  resetTransformaciones(){
    this.form_data.controls['estandarizar'].setValue(false, { emitEvent: false })
    this.form_data.controls['reescalar'].setValue(false, { emitEvent: false })
    this.form_data.controls['normailzar'].setValue(false, { emitEvent: false })
    this.form_data.controls['estandarizacionRobusta'].setValue(false, { emitEvent: false })
    this.form_data.controls['transformacionBoxCox'].setValue(false, { emitEvent: false })
    this.form_data.controls['transformacionYeoJohnson'].setValue(false, { emitEvent: false })
    this.transformacionesSeleccion = 'Seleccione'
    this.transformacionArr = []
    this.isOpenTransformaciones = false;
    this.validations[5] = ''
    this.contadorTransformaciones = 0;
    this.isOpenGraphics = false;
    (document.getElementById("selectAll") as HTMLInputElement).checked = false;
  }

  async realizarTransformacion(){
    this.isLoading = true;
    this.textLoading = 'Espera un momento estamos generando las transformaciones';

    let carrera =  this.carreraOption.find(e => e.value == this.form_data.controls['tipoCarrera'].value)

    let columnas: string[] =  [];
    this.variablesArr.forEach(e =>{
      columnas.push(e.codigo)
    })

    let form = {
      "columnas": columnas,
      "carrera": carrera?.file,
      "semestre": parseInt(this.form_data.controls['semestre'].value)
    }

    await this.service.postTransformaciones(form).subscribe(
      {
        next: (res: any) => {
          let data: string[] = res.data;
          let headerCSV: string[] = res.csv.columnas;
          let dataCSV: any[] = res.csv.dataTransformacion;
          this.dataCSV = dataCSV;
          this.headerCSV = headerCSV;
          this.images = data;
        },
        error: err => {
          console.error(err)
          this.isLoading = false;
        },
        complete: ()=>{
          this.isLoading = false;
          this.isOpenGraphics = true;

          // console.log(this.headerCSV);
          // console.log(this.dataCSV);
        }
      }
    )
  }

  descargarCSV(){
    this.isLoading = true;
    this.textLoading = 'Espera un momento, estamos generando el archivo .csv';


    var options = { 
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Datos analitica descriptiva',
      useBom: true,
      noDownload: true,
      headers: this.headerCSV
    };

    new ngxCsv(this.dataCSV, 'MyReport', options);

    this.isLoading = false;

  }

  async construirCSV(){

    this.isLoading = true;
    this.textLoading = 'Espera un momento, estamos generando el archivo .csv';

    let csvContent: string = ''; 
    this.headerCSV.forEach(e =>{
      if(csvContent == '') csvContent += e  
      else csvContent += ';' + e
    }) 
    csvContent += '\n'
    
    await this.dataCSV.forEach(e =>{
      Object.keys(e).forEach(key =>{
        csvContent += e[key] + ';'
      })
      csvContent += '\n';
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
