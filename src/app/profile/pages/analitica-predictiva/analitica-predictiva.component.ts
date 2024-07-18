import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { optionSelector } from '../../interfaces/shared.interface';

@Component({
  selector: 'app-analitica-predictiva',
  templateUrl: './analitica-predictiva.component.html',
  styleUrls: ['./analitica-predictiva.component.css']
})
export class AnaliticaPredictivaComponent implements OnInit {

  form_data: FormGroup;

  selectorBar: string[] = ['Transformaciones','Selección de variables', 'Hiperparámetros']
  selected:number = 0
  tap: string = this.selectorBar[this.selected];

  changeSelector(index:number){
    this.selected = index
    this.tap = this.selectorBar[this.selected];
  }

  validations:{[key: string]: string|null} = {
    2: '',
    3: '',
    4: '',
    5: ''
  }

  carreraOption: optionSelector[] = [
    {
      value: 1,
      option: 'Ingeniería Catastral y Geodesia'
    },
    {
      value: 2,
      option: 'Ingeniería de Sistemas'
    },
    {
      value: 3,
      option: 'Ingeniería Eléctrica'
    },
    {
      value: 4,
      option: 'Ingeniería Electrónica'
    },
    {
      value: 5,
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
    }
  ]

  tipoModeloOption: optionSelector[] = [
    {
      value: 1,
      option: 'Modelos supervisados'
    },
    {
      value: 2,
      option: 'Modelos no supervisados'
    }
  ]

  modeloOption: optionSelector[] = [
    {
      value: 1,
      option: 'Bagging'
    }
  ]

  isLoading: boolean = false;
  textLoading: string = 'Porfavor espere';

  isOpenResult: boolean = false;

  textTitleResult:string = '';

  constructor(private fb: FormBuilder) {
    this.form_data = this.fb.group({
      tipoCarrera: [''],
      semestre: [''],
      tipoModelo: [''],
      modelo: ['']
    })

    this.form_data.controls['tipoCarrera'].valueChanges.subscribe((data:string)=>{
      if(data){
        this.validations[2] = null
      }
      else{
        this.validations[2] = ''
      }
      this.form_data.controls['semestre'].setValue('')
      this.isOpenResult = false;
    })

    this.form_data.controls['semestre'].valueChanges.subscribe((data:string)=>{
      if(data){
        this.validations[3] = null
      }
      else{
        this.validations[3] = ''
      }
      this.form_data.controls['tipoModelo'].setValue('')
      this.isOpenResult = false;
    })

    this.form_data.controls['tipoModelo'].valueChanges.subscribe((data:string)=>{
      if(data){
        this.validations[4] = null
      }
      else{
        this.validations[4] = ''
      }
      this.form_data.controls['modelo'].setValue('')
      this.isOpenResult = false;
    })

    this.form_data.controls['modelo'].valueChanges.subscribe((data:string)=>{
      if(data){
        this.validations[5] = null
      }
      else{
        this.validations[5] = ''
      }
      this.isOpenResult = false;
    })
  }

  ngOnInit(): void {
  }

  realizarTransformacion(){
    this.isLoading = true;
    this.textLoading = 'Espera un momento estamos generando las transformaciones';

    setTimeout(() => {
      let values = [
        this.form_data.controls['tipoCarrera'].value-1,
        this.form_data.controls['semestre'].value-1,
        this.form_data.controls['tipoModelo'].value-1,
        this.form_data.controls['modelo'].value-1
      ]
      this.textTitleResult = `${this.carreraOption[values[0]].option}, ${this.semestreOption[values[1]].option}, ${this.tipoModeloOption[values[2]].option}, ${this.modeloOption[values[3]].option}.`;
      this.validations[5]=''
      this.isLoading = false;
      this.isOpenResult = true;
    }, 500);
  }

}
