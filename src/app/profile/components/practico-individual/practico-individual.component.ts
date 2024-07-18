import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { optionSelector, IFormPractico, IFormPracticoVariables } from '../../interfaces/shared.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

const Text: string[] = [
  'La predicción semestralizada dispone de las variables influyentes del semestre seleccionado. Por ejemplo, si se desea predecir el promedio o rendimiento para el primer semestre, se tomaran las variables pre universitarias, en caso que se desee predecir el promedio o rendimiento de algún otro semestre, se tomaran las variables influyentes del semestre anterior.',
  'La predicción anualizada dispone de las variables influyentes derivadas del módulo de selección de características agrupadas por tres años. Cada uno de estos consecutivamente van tomando variables de semestre pasados sin contemplar las del semestre referente al año indicado. Por ejemplo, si se desea predecir el promedio o rendimiento para el primer año, se tomaran las variables pre universitarias más las del primer semestre, sin contemplar las variables correspondientes al segundo semestre.'
]

@Component({
  selector: 'app-practico-individual',
  templateUrl: './practico-individual.component.html',
  styleUrls: ['./practico-individual.component.css']
})
export class PracticoIndividualComponent implements OnInit {

  @Output() loading = new EventEmitter<boolean>();

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

  anio: number[] = [1, 2, 3]

  semestreOption: number[] = []

  isFormVisible: boolean = false;

  formInitial: FormGroup;

  variablesForm: IFormPracticoVariables[] = [];

  formValid: boolean = false;

  ignoreField: string = ""

  numeros: string[] = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez']


  varForm: string = 'semestre';

  validForm: boolean = false

  text: string = this.varForm == 'semestre' ? Text[0] : Text[1];

  constructor(private fb: FormBuilder, private service: DataService) {

    this.formInitial = this.fb.group({
      carrera: [null || undefined, Validators.required],
      semestre: [null || undefined],
      ano: [null || undefined],
      tipoModelo: [null || undefined, Validators.required],
    })
  }

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.semestreOption.push(i);
    }
  }

  async onSubmit() {

    console.log(this.formInitial.value)
    this.loading.emit(true)
    await this.service.getFormPractico(this.formInitial.value as IFormPractico).subscribe({
      next: (res: any) => {
        this.variablesForm = <IFormPracticoVariables[]>res.variables;

        let array: number[] = []
        let arrayIgnoreFields: string[] = []
        if (this.formInitial.value.semestre !== null) {
          this.ignoreField = this.numeros[(this.formInitial.value.semestre as number) - 1].toUpperCase()
          this.variablesForm = this.variablesForm.filter(e => { return e.codigo != `PROMEDIO_${this.ignoreField}` && e.codigo != `RENDIMIENTO_${this.ignoreField}` })
        }
        else {
          if(this.formInitial.value.ano == 1) array = [2]
          if(this.formInitial.value.ano == 2) array = [4]
          if(this.formInitial.value.ano == 3) array = [8]
          array.forEach(numero =>{
            arrayIgnoreFields.push("PROMEDIO_"+this.numeros[numero].toUpperCase())
            arrayIgnoreFields.push("RENDIMIENTO_"+this.numeros[numero].toUpperCase())
            // if(this.formInitial.value.tipoModelo == 'regresion') arrayIgnoreFields.push("PROMEDIO_"+this.numeros[numero - 1].toUpperCase())
            // if(this.formInitial.value.tipoModelo == 'clasificacion') arrayIgnoreFields.push("RENDIMIENTO_"+this.numeros[numero - 1].toUpperCase())
          })

          console.log(arrayIgnoreFields)
          this.variablesForm = this.variablesForm.filter(e => !arrayIgnoreFields.includes(e.codigo))

          console.log(this.variablesForm)
        }
      },
      error: (err: any) => {
        console.error(err.error.message)
        console.error(err)
        this.loading.emit(false)
      },
      complete: () => {
        this.loading.emit(false)
        let checks: HTMLCollectionOf<Element>= document.getElementsByClassName('form-check-input')
        for(let i = 0; i < checks.length; i++){
          let check: HTMLInputElement = <HTMLInputElement>checks.item(i)
          check.disabled = true
        }
        this.formInitial.disable()
        this.formValid = true;
        this.isFormVisible = true;
      }
    })
  }

  limpiarForm() {
    let checks: HTMLCollectionOf<Element>= document.getElementsByClassName('form-check-input')
    for(let i = 0; i < checks.length; i++){
      let check: HTMLInputElement = <HTMLInputElement>checks.item(i)
      if(i == 0) check.checked = true
      check.disabled = false
    }
    (document.getElementById('divAno') as HTMLDivElement).style.display = "none";
    (document.getElementById('divSemestre') as HTMLDivElement).style.display = "flex";
    this.varForm = 'semestre'
    this.text = Text[0]
    this.formInitial.reset();
    this.isFormVisible = false;
    this.variablesForm = [];
    this.formInitial.enable()
    this.formValid = false;
  }

  cambiarForm($event: Event, varString: string) {

    this.varForm = varString;

    if (varString == 'semestre') {
      (document.getElementById('divAno') as HTMLDivElement).style.display = "none";
      (document.getElementById('divSemestre') as HTMLDivElement).style.display = "flex";
      this.text = Text[0]
    } else {
      (document.getElementById('divSemestre') as HTMLDivElement).style.display = "none";
      (document.getElementById('divAno') as HTMLDivElement).style.display = "flex";
      this.text = Text[1]
    }


    (document.getElementById('inputSemestre') as HTMLSelectElement).selectedIndex = 0;
    (document.getElementById('inputAno') as HTMLSelectElement).selectedIndex = 0;

    // Restablecer variables
    this.formInitial.setValue({ ano: null, semestre: null, carrera: this.formInitial.value.carrera, tipoModelo: this.formInitial.value.tipoModelo })

    this.validForm = false;
    this.varForm = varString;
    
  }

  validarCampo($event: Event) {
    if ((<HTMLInputElement>$event.target).value !== '0' && (<HTMLInputElement>$event.target).value !== undefined) this.validForm = true
    else this.validForm = false
  }

}
