import { DataService } from './../../services/data.service';
import { DataExcelToArray, optionSelector, CuerpoAnalitics, EndPoint } from './../../interfaces/shared.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulo-practico',
  templateUrl: './modulo-practico.component.html',
  styleUrls: ['./modulo-practico.component.css']
})
export class ModuloPracticoComponent implements OnInit {

  form_data: FormGroup;
  isLoading: boolean = false;
  textLoading: string = 'Por favor espere, esto puede tardar unos minutos';
  selectorBar = ['Predicción individual','Predicción grupal']

  texto: string[] = [
    `1.	Seleccione la carrera, el semestre y el tipo de modelo de las listas desplegables correspondientes.
    2.	Para la predicción individual, indique si el análisis se realizará por semestre o por año. Luego, cree el formulario y llene los campos necesarios para la predicción individual.
    3.	Para la predicción grupal masiva, utilice el archivo cargado y limpiado del módulo de carga y limpieza.
    4.	Genere estas predicciones y descargue los resultados obtenidos para cada estudiante en un archivo plano.`,
    `1.	Seleccione la carrera, el semestre y el tipo de modelo de las listas desplegables correspondientes.
    2.	Para la predicción individual, indique si el análisis se realizará por semestre o por año. Luego, cree el formulario y llene los campos necesarios para la predicción individual.
    3.	Para la predicción grupal masiva, utilice el archivo cargado y limpiado del módulo de carga y limpieza.
    4.	Genere estas predicciones y descargue los resultados obtenidos para cada estudiante en un archivo plano.`
  ]

  selected:number = 0;

  dataFile: File  | null = null;

  isUpFile:  boolean =  false;

  estudiantesData: DataExcelToArray;

  pasoPrediccionGrupal:number = 1;

  // Atributo para guardar los endpoints a consumir en el servicio
  // endPoints: EndPoint[] = [
  //   {
  //     url: 'predict_tree',
  //     publicName: 'DecisionTreeRegressor',
  //     prediction: 0
  //   },
  //   {
  //     url: 'predict_gradient',
  //     publicName: 'GradientRegressor',
  //     prediction: 0
  //   },
  //   {
  //     url: 'predict_xgboost',
  //     publicName: 'XgbootsRegressor',
  //     prediction: 0
  //   },
  //   {
  //     url: 'predict_voting',
  //     publicName: 'VotingRegressor',
  //     prediction: 0
  //   },
  // ]

  isOpenResult: boolean = false;

  // anio1: number = new Date().getFullYear();
  // anio0: number = 1990

  anios: number[] = [];
  

  constructor(private fb: FormBuilder, private data: DataService) {

    let numRegex = /^-?\d*[.,]?\d{0,2}$/;
    
    // this.form_data = this.fb.group({
    //   estrato: ['', [Validators.required, Validators.min(0), Validators.max(6)]],
    //   biologia: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   quimica: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   fisica: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   sociales: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   aptitud_verbal: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   espanol_literatura: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   aptitud_matematica: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   condicion_matematica: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   filosofia: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   historia: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   geografia: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   idioma: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   puntos_icfes: ['', [Validators.required, Validators.min(0), Validators.max(500)]],
    //   puntos_homologados: ['', [Validators.required, Validators.min(0), Validators.max(500)]],
    //   anno_nota: ['', [Validators.required, Validators.min(this.anio0), Validators.max(this.anio1)]],
    //   semestre_nota: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   promedio: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   sexo: ['', [Validators.required]],
    // })

    // for(let i = this.anio0; i <= this.anio1; i++){
    //   this.anios.push(i);
    // }

  }


  ngOnInit(): void {
  }

  changeSelector(index:number){
    this.selected = index
  }

  saveFile(event: any){
    if(event.target.files && event.target.files.length){
      this.isLoading = true;
      this.textLoading = 'Espera un momento estamos subiendo los archivos';
      setTimeout(() => {
        this.isLoading = false;
        this.dataFile = event.target.files[0]
        this.isUpFile= true;
      }, 1000);
    }
  }

  isDataFile(){
    return this.dataFile==null
  }

  async showTable(){
    this.isLoading = true;
    this.textLoading = 'Este proceso puede tomar unos minutos';

    if(this.dataFile){
      this.data.excelToArray(this.dataFile, 'string').subscribe({
        next: (res) => {
          this.estudiantesData = res.table;
        },
        error: err => console.log(err),
        complete: ()=>{
          this.isLoading = false;
          this.pasoPrediccionGrupal =  2;
          this.isUpFile = false;
        }
      })
    }
  }

  // async generarPrediccion(parameter: number){
  //   this.isLoading = true;
  //   this.textLoading = 'Este proceso puede tomar unos minutos';

  //   if(parameter == 0){
  //     var form: CuerpoAnalitics = {
  //       estrato: parseInt(this.form_data.value['estrato']),
  //       biologia: parseInt(this.form_data.value['biologia']),
  //       quimica: parseInt(this.form_data.value['quimica']),
  //       fisica: parseInt(this.form_data.value['fisica']),
  //       sociales: parseInt(this.form_data.value['sociales']),
  //       aptitud_verbal: parseInt(this.form_data.value['aptitud_verbal']),
  //       espanol_literatura: parseInt(this.form_data.value['espanol_literatura']),
  //       aptitud_matematica: parseInt(this.form_data.value['aptitud_matematica']),
  //       condicion_matematica: parseInt(this.form_data.value['condicion_matematica']),
  //       filosofia: parseInt(this.form_data.value['filosofia']),
  //       historia: parseInt(this.form_data.value['historia']),
  //       geografia: parseInt(this.form_data.value['geografia']),
  //       idioma: parseInt(this.form_data.value['idioma']),
  //       puntos_icfes: parseInt(this.form_data.value['puntos_icfes']),
  //       puntos_homologados: parseInt(this.form_data.value['puntos_homologados']),
  //       anno_nota: parseInt(this.form_data.value['anno_nota']),
  //       semestre_nota: parseInt(this.form_data.value['semestre_nota']),
  //       promedio: parseInt(this.form_data.value['promedio']),
  //       genero_MASCULINO: parseInt(this.form_data.value['promedio']) == 1 ? 1 : 0, // 1 select option sexoOption
  //       genero_FEMENINO: parseInt(this.form_data.value['promedio']) == 2 ? 1 : 0, // 2 select option sexoOption
  //       genero_NO_REGISTRA: parseInt(this.form_data.value['promedio']) == 3 ? 1 : 0 // 3 select option sexoOption
  //     };
  //     this.endPoints.forEach(e => {
  //       var prediction: number = 0;

  //       this.data.dataAnalitics(e.url, form).subscribe({
  //         next: (res) =>{
  //           let resP: any = res
  //           prediction = resP.prediction
  //         },
  //         error: (err) =>{
  //           console.error(err.error.message)
  //           console.error(err)
  //         },
  //         complete: ()=>{
  //           e.prediction = prediction
  //         }
  //       })
  //     })
  //     this.isOpenResult = !this.isOpenResult; 
  //     this.isLoading = false;
  //   }
  //   if(parameter == 1){
  //     this.isLoading = true;
  //     setTimeout(() => {
  //       this.isLoading = false;
  //       this.pasoPrediccionGrupal =  3;
  //     }, 1000);
  //   }
  // }

  newForm(): void{
    this.isOpenResult = !this.isOpenResult
    this.form_data.reset()
  }

  changeLoading(state: boolean): void{
    this.isLoading = state;
  }

}



