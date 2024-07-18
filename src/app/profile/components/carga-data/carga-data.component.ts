import { DataExcelToArray, optionSelector } from './../../interfaces/shared.interface';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-carga-data',
  templateUrl: './carga-data.component.html',
  styleUrls: ['./carga-data.component.css']
})
export class CargaDataComponent implements OnInit {

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
      title: 'Cálculo de variables',
      imgUrl: '/assets/calculo-icon.svg'
    },
  ]

  carreraOption: optionSelector[] = [
    {
      value: 0,
      option: 'TOTAL FACULTAD'
    },
    {
      value: 1,
      option: 'INGENIERIA CATASTRAL Y GEODESIA'
    },
    {
      value: 2,
      option: 'INGENIERIA SISTEMAS'
    },
    {
      value: 3,
      option: 'INGENIERIA ELECTRICA'
    },
    {
      value: 4,
      option: 'INGENIERIA ELECTRONICA'
    },
    {
      value: 5,
      option: 'INGENIERIA INDUSTRIAL'
    }
  ]

  dirtyData: DataExcelToArray = {
    columns: ["col primer valor", "coool 2", "col 3", "cooooooool 4","col 5", "coooooooooooooooooooooool 6", "coooooooooooooooooooooooool 7", "cooooooooooooooooooooool 8"],
    data: [
      ["data primer valor", "data a2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data b2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data c2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data d2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data e2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data f2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data g2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data h2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data i2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data j2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data k2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data l2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data m2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data n2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
      ["data 1", "data o2", "daata 3", "daaaaaaaata 4", "daaaaaaataaaaaaa 55555555", "data 6", "data 7", "data 8"],
    ]
  }

  cleanData!:  DataExcelToArray
  nuevasVariables!:  DataExcelToArray


  textLoading: string = 'Espera un momento, filtrando tu busqueda';

  selected:number = 1;

  limpieza_flag: boolean = false;

  new_variables_flag: boolean = false;

  form_data: FormGroup;

  dataFile: File  | null = null;

  isLoading: boolean = false;

  isData: boolean = false;

  facultadSelected: string = ''

  columns: String [] = []
  returnData: String [][] = []

  returnDataCleaned: String [][] = []
  
  @ViewChild('toggleModal') toggleModal!: ElementRef;
  @ViewChild('toggleModalError') toggleModalError!: ElementRef;


  constructor(private fb: FormBuilder, private data: DataService) {
    this.form_data = this.fb.group({
      tipoCarrera: [''],
    })
  }

  ngOnInit(): void {
    this.data.test().subscribe(res =>{
      console.log(res);
    })
  }

  async saveFile(event: any){

    if(event.target.files && event.target.files.length){

      this.isLoading = true;
      this.textLoading = 'Espera un momento estamos subiendo los archivos';
      this.dataFile = event.target.files[0]

      this.carreraOption.forEach(e =>{
        if((document.getElementById('facultad') as HTMLSelectElement).value == e.value.toString()){
          this.facultadSelected = e.option
        }
      })

      await this.data.excelToArray(event.target.files[0], this.facultadSelected).subscribe({
        next: (res) => { 
          // res.json()
          let {columns, data} = res
          this.columns = columns
          this.returnData = data
          // this.dirtyData = res.table;
        },
        error: err => {
          this.dataFile = null;
          this.isData = false;
          console.log(err);
          this.isLoading = false;
          this.toggleModalError.nativeElement.click();
        },
        complete: ()=>{
          this.isData = true;
          this.isLoading = false;
        }
      })

    }

  }

  selectDisbled(){
    return this.dataFile?'disabled':null
  }

  addSelected(){
    this.isLoading = true;
    this.textLoading = 'Este proceso puede tardar unos minutos';

    setTimeout(() => {
      this.isLoading = false;
      this.selected++;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 1000);
  }

  limpieza(){
    this.isLoading = true;
    this.textLoading = 'Este proceso puede tardar unos minutos';

    // if(this.dataFile){

    // this.data.cargaLimpieza(this.dataFile,this.form_data.value['tipoCarrera']).subscribe({
    
    let body: DataExcelToArray = {
      columns: this.columns,
      data: this.returnData
    }
    this.data.cargaLimpieza(body).subscribe({
      next: (res) => {
        console.log(res)
        // this.cleanData = res.table;
        this.returnDataCleaned = res.data
      },
      error: err => {
        console.log(err);
        this.resetAll();
        this.toggleModalError.nativeElement.click();
      },
      complete: ()=>{
        this.isLoading = false;
        this.limpieza_flag = true;
        console.log(this.returnDataCleaned)
      }
    })
  }

  newVariables(){
    this.isLoading = true;
    this.textLoading = 'Este proceso puede tardar unos minutos';

    if(this.dataFile){

      this.data.newVariables(this.dataFile).subscribe({ // this.facultadSelected
        next: (res) => {
          this.nuevasVariables = res.table;
        },
        error: err => {
          console.log(err);
          this.resetAll();
          this.toggleModalError.nativeElement.click();
        },
        complete: ()=>{
          this.isLoading = false;
          this.new_variables_flag = true;
          this.selected++;
        }
      })

    }
  }

  resetAll(){
    this.textLoading = 'Espera un momento, filtrando tu busqueda';

    this.selected = 1;

    this.limpieza_flag = false;

    this.new_variables_flag = false;

    this.form_data.reset();

    this.dataFile = null

    this.isData = false;

    this.isLoading = false;

    this.form_data.controls['tipoCarrera'].setValue('')
  }

  save(){
    this.isLoading = true;
    this.textLoading = 'Este proceso puede tardar unos minutos';

    setTimeout(() => {
      this.isLoading = false;
      this.new_variables_flag = true;
      this.toggleModal.nativeElement.click();
    }, 1000);
  }

}
