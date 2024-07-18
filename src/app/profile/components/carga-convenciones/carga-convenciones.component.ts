import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataExcelToArray } from '../../interfaces/shared.interface';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-carga-convenciones',
  templateUrl: './carga-convenciones.component.html',
  styleUrls: ['./carga-convenciones.component.css']
})
export class CargaConvencionesComponent implements OnInit {


  selectorBar = [
    {
      title: 'Carga de data',
      imgUrl: '/assets/carga-icon.svg'
    },
    {
      title: 'Limpieza',
      imgUrl: '/assets/limpieza-icon.svg'
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

  textLoading: string = 'Espera un momento, filtrando tu busqueda';

  selected:number = 1;

  isData: boolean = false;

  limpieza_flag: boolean = false;

  new_variables_flag: boolean = false;

  dataFile: File  | null = null;

  isLoading: boolean = false;

  @ViewChild('toggleModal') toggleModal!: ElementRef;
  @ViewChild('toggleModalError') toggleModalError!: ElementRef;

  constructor( private data: DataService) { }

  ngOnInit(): void {
  }

  saveFile(event: any){

    if(event.target.files && event.target.files.length){

      this.isLoading = true;
      this.textLoading = 'Espera un momento estamos subiendo los archivos';
      this.dataFile = event.target.files[0]

      this.data.excelToArray(event.target.files[0], 'string').subscribe({
        next: (res) => {
          this.dirtyData = res.table;
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

  subirInfo(){
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

    if(this.dataFile){

      this.data.limpieza(this.dataFile).subscribe({
        next: (res) => {
          this.cleanData = res.table;
        },
        error: err => {
          this.resetAll();
          console.log(err);
          this.toggleModalError.nativeElement.click();
        },
        complete: ()=>{
          this.isLoading = false;
          this.selected++;
          this.limpieza_flag = true;
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      })

    }
  }

  resetAll(){
    this.textLoading = 'Espera un momento, filtrando tu busqueda';

    this.selected = 1;

    this.limpieza_flag = false;

    this.new_variables_flag = false;

    this.dataFile = null

    this.isData = false;

    this.isLoading = false;
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
