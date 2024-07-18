import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHiperParametros, optionSelector, optionSelectorHiper } from '../../interfaces/shared.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-hiperparametros',
  templateUrl: './hiperparametros.component.html',
  styleUrls: ['./hiperparametros.component.css']
})
export class HiperparametrosComponent implements OnInit {

  form_data: FormGroup;

  carreraOption: optionSelector[] = [
    {
      value: 'Catastral',
      option: 'Ingeniería Catastral y Geodesia'
    },
    {
      value: 'Sistemas',
      option: 'Ingeniería de Sistemas'
    },
    {
      value: 'Electrica',
      option: 'Ingeniería Eléctrica'
    },
    {
      value: 'Electronica',
      option: 'Ingeniería  Electrónica'
    },
    {
      value: 'Industrial',
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

  tipoModeloOption: optionSelector[] = [
    {
      value: 'Regresion',
      option: 'Regresión'
    },
    {
      value: 'Clasificacion',
      option: 'Clasificación'
    }
  ]

  modelosOption: optionSelector[] = [
    {
      value: 'AdaBoost',
      option: 'AdaBoost'
    },
    {
      value: 'Bagging',
      option: 'Bagging'
    },
    {
      value: 'CatBoost',
      option: 'CatBoost'
    },
    {
      value: 'DecisionTree',
      option: 'DecisionTree'
    },
    {
      value: 'ExtraTrees',
      option: 'ExtraTrees'
    },
    {
      value: 'GradientBoosting',
      option: 'GradientBoosting'
    },
    {
      value: 'KNeighbors',
      option: 'KNeighbors'
    },
    {
      value: 'LDA',
      option: 'LDA'
    },
    {
      value: 'LGBM',
      option: 'LGBM'
    },
    {
      value: 'NaiveBayes',
      option: 'NaiveBayes'
    },
    {
      value: 'RandomForest',
      option: 'RandomForest'
    },
    {
      value: 'StackingLineal',
      option: 'StackingLineal'
    },
    {
      value: 'Stackingnolineal',
      option: 'Stackingnolineal'
    },
    {
      value: 'SuperAprendiz',
      option: 'SuperAprendiz'
    },
    {
      value: 'SuperAprendizdoscapas',
      option: 'SuperAprendizdoscapas'
    },
    {
      value: 'SVR',
      option: 'SVR'
    },
    {
      value: 'Voting',
      option: 'Voting'
    },
    {
      value: 'XGB',
      option: 'XGB'
    },
  ]

  isSubmit: boolean = false;

  hiperparametros: IHiperParametros[] = []
  hiperparametrosAll: IHiperParametros[] = []
  mejoresHiperparametros: IHiperParametros[] | undefined;
  frontHiperparametros: optionSelectorHiper[] = [];

  tipoModelo: string;
  nombreModelo: string;
  tipoModeloTemp: string;
  nombreModeloTemp: string;

  isLoading: boolean = false;
  textLoading: string = 'Por favor espere';
  send: boolean = false;


  contadorVariables: number = 0;

  variablesArr: optionSelector[] = [];
  
  constructor(private fb: FormBuilder, private service: DataService) {
    this.form_data = this.fb.group({
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
      tipoModelo: ['', Validators.required],
      // modelo: ['', Validators.required]
    })

    this.form_data.controls['carrera'].valueChanges.subscribe((data:string)=>{
      if(data == "") this.cancelar()
    })
    this.form_data.controls['semestre'].valueChanges.subscribe((data:string)=>{
      if(data == "") this.cancelar()
    })
    this.form_data.controls['tipoModelo'].valueChanges.subscribe((data:string)=>{
      if(data == "") this.cancelar()
      this.tipoModeloTemp = data
    })
    // this.form_data.controls['modelo'].valueChanges.subscribe((data:string)=>{
    //   this.nombreModeloTemp = data
    // })
  }

  cancelar(){
    let all: HTMLInputElement = <HTMLInputElement> document.getElementById("selectAll");
    all.checked = false
    let htmlObj: NodeListOf<HTMLInputElement> = <NodeListOf<HTMLInputElement>> document.getElementsByName("variablesSelect");
    htmlObj.forEach(e=> {e.checked=false})
    this.contadorVariables = 0
    this.variablesArr = []
  }

  ngOnInit(): void {
  }

  async getModels() {
    let any: any = {
      tipoModelo: this.form_data.value.tipoModelo,
      carrera: this.form_data.value.carrera,
      semestre: this.form_data.value.semestre
    }
    if(
      (any.tipoModelo !== null && any.tipoModelo !== undefined && any.tipoModelo !== '' ) &&
      (any.carrera !== null && any.carrera !== undefined && any.carrera !== '' ) &&
      (any.semestre !== null && any.semestre !== undefined && any.semestre !== '' )
    ){
      this.isLoading = true;

      let arrayString: string[] = [];
  
      await this.service.getModels(any).subscribe({
        next: (res: any) => { 
          let resAny: any[] = res.data.dataTransformacion
          resAny.forEach(e => {
            if(!arrayString.includes(e.MODELO)) arrayString.push(e.MODELO)
          })
          this.modelosOption = []
          arrayString.forEach(e =>{
            this.modelosOption.push({option: e, value: e})
          })
        },
        error: (err: Error) => {
          console.error(err)
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

  async sendData() {

    this.isLoading = true;
    this.isSubmit = false;
    this.textLoading = 'Espera un momento, estamos consultando las variables de la carrera y semestre';

    let array: string[]=[]
    this.variablesArr.forEach(e=>{
      array.push(<string>e.value)
    })

    let any: any = this.form_data.value;
    any.modelos = array
    console.log(any)


    await this.service.getDataHiperparametros(any).subscribe({
      next: (res: any) => { 
        this.hiperparametrosAll = <IHiperParametros[]>res.data;
        this.hiperparametros = <IHiperParametros[]>res.data;
        this.mejoresHiperparametros = this.hiperparametros.filter(e => e.METRICA == 'Mejores Hiperparametros')
        this.hiperparametros = this.hiperparametros.filter(e => e.METRICA !== 'Mejores Hiperparametros');
        if(this.mejoresHiperparametros != undefined){
          this.mejoresHiperparametros.forEach(e =>{
            let arrayString: string[] = (e.VALOR as string).split(',');
            arrayString.forEach(element => {
              let string = element.trim()
              let subArrayString: string[] = string.split(": ");
              this.frontHiperparametros.push({
                option: subArrayString[0],
                value: subArrayString[1],
                modelo: e.MODELO
              })
            })
          })
        }
        this.nombreModelo = this.nombreModeloTemp 
        this.tipoModelo = this.tipoModeloTemp 
      },
      error: (err: Error) => {
        console.error(err)
        this.isLoading = false;
        this.send = false
      },
      complete: () => {
        this.isLoading = false;
        this.isSubmit = !this.isSubmit
        this.send = true
      }
    })
  }

  async construirCSV(){

    this.isLoading = true;
    this.textLoading = 'Espera un momento, estamos generando el archivo .csv';

    let csvContent: string = ''; 

    let header: IHiperParametros = this.hiperparametrosAll[0];

    Object.keys(header).forEach((key:string) =>{
      // csvContent += header[key as keyof typeof header] + ';'
      csvContent += key + ';'
    })

    csvContent += '\n'

    console.log(csvContent)
    
    await this.hiperparametrosAll.forEach(e =>{
      Object.keys(e).forEach((key:string) =>{
        csvContent += e[key as keyof typeof e] + ';'
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


  metricas(option: string): IHiperParametros[]{
    return this.hiperparametros.filter(e => e.MODELO == option)
  }

  metricasHiper(option: string): optionSelectorHiper[]{
    return this.frontHiperparametros.filter(e => e.modelo == option)
  }

}
