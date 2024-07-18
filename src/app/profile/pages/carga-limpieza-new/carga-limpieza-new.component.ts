import { Component, OnInit } from '@angular/core';
import { ICargaData, optionSelector } from '../../interfaces/shared.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-carga-limpieza-new',
  templateUrl: './carga-limpieza-new.component.html',
  styleUrls: ['./carga-limpieza-new.component.css']
})
export class CargaLimpiezaNewComponent implements OnInit {

  isLoading: boolean = false;
  textLoading: string = 'Por favor espere, esto puede tardar unos minutos';

  formInitial: FormGroup;
  dataFile: File  | null = null;

  formValid: boolean = false;

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

  selectorBar = [
    {
      title: 'Carga de data',
      imgUrl: '/assets/carga-icon.svg'
    },
    {
      title: 'Limpieza',
      imgUrl: '/assets/limpieza-icon.svg'
    },
    {
      title: 'Descarga de data',
      imgUrl: '/assets/calculo-icon.svg'
    },
  ]

  selected:number = 1;

  dataInput: ICargaData;
  dataOutput: ICargaData;

  funciono: boolean | undefined = undefined;
  message: string = "";

  tempCarrera: string = ''

  constructor(private fb: FormBuilder, private service: DataService) {
    this.formInitial = this.fb.group({
      carrera: [null || undefined, Validators.required],
      file: [null || undefined, Validators.required],
    })
  }

  ngOnInit() {
  }

  async onSubmit() {
    if(this.dataFile !== null){
      this.isLoading = true
      await this.service.cargaLimpieza2(this.dataFile, this.formInitial.value.carrera).subscribe({
        next: (res: any) => {
          console.log(res)
          this.dataInput = res.input
          this.dataOutput = res.output
        },
        error: (err: any) => {
          console.error(err)
          this.message = err.error.detail
          this.funciono = false;
          this.isLoading = false;
        },
        complete: () => {
          this.tempCarrera = this.formInitial.value.carrera
          this.selected = 3
          this.funciono = true;
          this.isLoading = false
        }
      })
    }
  }

  limpiarForm() {
    this.formInitial.reset(); 
    this.formInitial.enable()
    this.formValid = false;
    this.selected = 1
    this.funciono = undefined;
  }

  saveFile($event: any){
    console.log($event)
    if($event.target.files && $event.target.files.length){
      const file = $event.target.files[0]; // Here we use only the first file (single file)
      // this.formInitial.patchValue({ file: true });
      this.dataFile = file
      this.formInitial.value.file = true
      this.selected = 2
    }else{
      this.formInitial.value.file = null
      this.selected = 1
      // this.formInitial.patchValue({ file: null });
    }
  }

  // async construirCSV(cabecera: any[], datos: any[]){
  async construirCSV(){

    this.isLoading = true;
    this.textLoading = 'Espera un momento, estamos generando el archivo .csv';

    let csvContent: string = ''; 
    this.dataOutput.columnas.forEach(e =>{
      if(csvContent == '') csvContent += e  
      else csvContent += ';' + e
    }) 
    csvContent += '\n'
    
    await this.dataOutput.data.forEach( (e: any) =>{
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



