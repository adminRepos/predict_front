import { Component, Input, OnInit } from '@angular/core';
import { IArrayRules, IFormPractico, IFormPracticoVariables, IPrediccionPracticoTextos, bdCalendarioColegio, bdCorte, bdDepartamento, bdEstadoFinal, bdEstadoPrueba, bdEstrato, bdGenero, bdInscripcion, bdLocalidad, bdMunicipio, bdTipoColegio } from '../../interfaces/shared.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { IPrediccionPractico } from '../../interfaces/shared.interface';

const Rendimientos: IPrediccionPracticoTextos[] = [
  {
    rendimiento: 1,
    parrafo: `Los estudiantes en el rendimiento 1 enfrentan serios riesgos de perder su calidad de estudiantes debido a su bajo desempeño académico. Esta situación puede ser resultado de diversas causas, como dificultades en la comprensión de los contenidos, falta de motivación, o problemas personales. Para mejorar su rendimiento, es crucial que estos estudiantes busquen apoyo adicional, como tutorías, grupos de estudio o asesoramiento académico. Además, deben establecer un plan de estudio riguroso y dedicar tiempo extra a las materias más desafiantes. La clave está en no rendirse y aprovechar todos los recursos disponibles para revertir esta situación crítica.`,
    recomendacion: `Participar activamente en tutorías y grupos de estudio, y establecer un plan de estudio diario enfocado en las áreas más débiles.`
  },
  {
    rendimiento: 2,
    parrafo: `Los estudiantes en el rendimiento 2 están en una situación precaria donde cualquier descuido podría llevarlos a caer al rendimiento 1. Aunque muestran un esfuerzo y logran pasar sus asignaturas, su desempeño aún es inestable. Estos estudiantes deben concentrarse en fortalecer sus bases académicas y mejorar su organización y gestión del tiempo. Es recomendable que revisen continuamente sus apuntes y realicen prácticas adicionales para consolidar sus conocimientos. Además, mantener una comunicación constante con los profesores puede ayudarles a aclarar dudas y obtener orientación adicional.`,
    recomendacion: `Realizar prácticas adicionales y mantener comunicación constante con los profesores para aclarar dudas.`
  },
  {
    rendimiento: 3,
    parrafo: `El rendimiento 3 indica que los estudiantes tienen un desempeño aceptable, pero todavía hay margen para la mejora. Estos estudiantes han demostrado una buena comprensión de los materiales, pero pueden beneficiarse de una mayor dedicación y de técnicas de estudio más eficientes. Para avanzar al siguiente nivel, es crucial que se enfoquen en perfeccionar sus métodos de estudio y en buscar oportunidades para aplicar lo aprendido de manera práctica. Participar en actividades extracurriculares relacionadas con sus estudios también puede proporcionarles una perspectiva más amplia y mejorar su rendimiento académico.`,
    recomendacion: `Perfeccionar métodos de estudio y participar en actividades extracurriculares relacionadas con las materias.`
  },
  {
    rendimiento: 4,
    parrafo: `Los estudiantes con un rendimiento 4 presentan un desempeño académico excelente. Han demostrado un alto nivel de comprensión y aplicación de los contenidos, y sus hábitos de estudio son sólidos. Para mantener y aún mejorar este nivel, es importante que estos estudiantes continúen desafiándose a sí mismos. Pueden buscar cursos avanzados, participar en proyectos de investigación o colaborar en iniciativas académicas. Además, compartir sus conocimientos ayudando a otros estudiantes puede reforzar aún más su propio aprendizaje.`,
    recomendacion: `Buscar cursos avanzados, participar en proyectos de investigación y ayudar a otros estudiantes para reforzar conocimientos.`
  },
]

@Component({
  selector: 'app-dinamic-input',
  templateUrl: './dinamic-input.component.html',
  styleUrls: ['./dinamic-input.component.css']
})
export class DinamicInputComponent implements OnInit {

  @Input() items: IFormPracticoVariables[] = [];
  // @Input() ignoreField: string = ""
  @Input() formInitial: IFormPractico;

  formPredict: FormGroup;

  isOpenResult: boolean = false;

  variablesSelect: IArrayRules[] = [
    {
      string: "GENERO", 
      rules: bdGenero
    },
    {
      string: "TIPO_COLEGIO", 
      rules: bdTipoColegio
    },
    {
      string: "LOCALIDAD_COLEGIO", 
      rules: bdLocalidad
    },
    {
      string: "CALENDARIO", 
      rules: bdCalendarioColegio
    },
    {
      string: "MUNICIPIO", 
      rules: bdMunicipio
    },
    {
      string: "DEPARTAMENTO", 
      rules: bdDepartamento
    },
    {
      string: "LOCALIDAD", 
      rules: bdLocalidad
    },
    {
      string: "INSCRIPCION", 
      rules: bdInscripcion
    },
    {
      string: "ESTRATO", 
      rules: bdEstrato
    },
    {
      string: "CORTE_INGRESO", 
      rules: bdCorte
    },
    {
      string: "ESTADO_FINAL",
      rules: bdEstadoFinal
    },
    {
      string: "ESTADO_PRUEBA",
      rules: bdEstadoPrueba
    },
    // {
    //   string: "ANO_INGRESO",
    //   rules: bd--- // pendiente
    // } 
  ]

  mejoresModelos: IPrediccionPractico[] = []

  rendimientos: IPrediccionPracticoTextos[] = Rendimientos

  rendimientoSeleccionado: IPrediccionPracticoTextos = Rendimientos[0]
  

  constructor(private fb: FormBuilder, private service: DataService) {
  }

  ngOnInit(): void {
    let formGroup: any = {};

    this.items.forEach(control => {
      this.variablesSelect.forEach(e =>{
        if(e.string == control.codigo) control.rules = e.rules
      })
      let controlValidators: any[] = [];
      ​controlValidators.push(Validators.required);
      ​controlValidators.push(Validators.pattern(/^[0-9]\d*$/));
      formGroup[control.codigo] = ['', controlValidators];
    })

    this.formPredict = this.fb.group(formGroup);
    
  }

  onSubmitPredict(){
    this.service.getPredictPractico(this.formPredict.value).subscribe({
      next: (res: any) =>{
        this.mejoresModelos = <IPrediccionPractico[]>res
        let prediccion: number = <number>this.mejoresModelos[0].prediccion
        if(prediccion < 3) this.rendimientoSeleccionado = this.rendimientos[0]
        if(prediccion >= 3 && prediccion < 4) this.rendimientoSeleccionado = this.rendimientos[1]
        if(prediccion >= 4 && prediccion < 4.5) this.rendimientoSeleccionado = this.rendimientos[2]
        if(prediccion >= 4.5) this.rendimientoSeleccionado = this.rendimientos[3]
      },
      error: (err: any) => {
        console.error(err.error.message)
        console.error(err)
      },
      complete: () => {
        this.isOpenResult = true
      }
    })
  }

}
