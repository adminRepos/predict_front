import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataExcelToArray, Diccionario, IFormPractico, IFormPracticoVariables } from '../interfaces/shared.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  base = 'http://127.0.0.1:8000'
  basePractico = `${this.base}/practico`
  basePredictiva = `${this.base}/predictiva`
  baseDiagnostica = `${this.base}/diagnostica`
  baseCarga = `${this.base}/cargaLimpieza`
  
  // ======== DEPRECATED ========
  // base_url = 'http://127.0.0.1:8100/predictions'
  // urlAnalitics = 'http://127.0.0.1:8000'
  // ======== END DEPRECATED ========

  headers : any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }) 
  }

  constructor(private http: HttpClient) { }

  test(){
    return this.http.get<any>(`http://127.0.0.1:8100/`, this.headers)
  }

  excelToArray(file:File, facultad: string){
    const formData = new FormData();
    formData.append('file', file);
    let params = new HttpParams().set('sheet_name', 'Hoja1').set('ingenieria', facultad);
    // return this.http.post<{table:DataExcelToArray}>(`${this.base_url}/excelToArray`,formData, {params: params})
    return this.http.post<any>(`${this.base}/excelToArray`,formData, {params: params})
  }

  cargaLimpieza(data: DataExcelToArray){ // tipoCarrera:string
    // const formData = new FormData();
    // formData.append('data', data);
    // return this.http.post<{table:DataExcelToArray}>(`${this.base_url}/carga_limpieza?tipoCarrera=${tipoCarrera}`,formData)
    return this.http.post<any>(`${this.base}/carga_limpieza`,data)
  }

  newVariables(file:File){ // tipoCarrera:string
    const formData = new FormData();
    formData.append('file', file);
    // let params = new HttpParams().set('tipoCarrera', tipoCarrera);
    return this.http.post<{table:DataExcelToArray}>(`${this.base}/new_variables`,formData)
  }

  limpieza(file:File){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{table:DataExcelToArray}>(`${this.base}/limpieza`, formData)
  }
  
  dataAnalitics(url: String, form: any){
    // return this.http.post<any>(`${this.urlAnalitics}/${url}`, form, this.headers)
    return this.http.post<any>(`${this.base}/${url}`, form, this.headers)
  }

  cargaLimpieza2(file: File, facultad: string){
    const formData = new FormData();
    formData.append('file', file);
    let params = new HttpParams().set('sheet_name', 'Base-ingeniería-industrial-orig').set('ingenieria', facultad);
    return this.http.post<any>(`${this.baseCarga}/procesar_archivos`,formData, {params: params})
  }  


  // MODULO PRACTICO
  // PREDICCION INDIVIDUAL
  getFormPractico(form: IFormPractico): any {
    return this.http.post<any>(`${this.basePractico}/individual/formInitial`, form, this.headers)
  }
    
  getPredictPractico(form: any): any {
    return this.http.post<any>(`${this.basePractico}/individual/predict`, form, this.headers)
  }
  // PREDICCION GRUPAL
  getDataGrupal(form: IFormPractico): any {
    return this.http.post<any>(`${this.basePractico}/grupal/formInitial`, form, this.headers)
  }
  // END MODULO PRACTICO

  // MODULO PREDICTIVO
  
  // MODULO PREDICTIVO | HIPERPARAMETROS
  
  getModels(form: any): any {
    return this.http.post<any>(`${this.basePredictiva}/hiperparametros/getModels`, form, this.headers)
  }

  getDataHiperparametros(form: any): any {
    return this.http.post<any>(`${this.basePredictiva}/hiperparametros/getDataHiperparametros`, form, this.headers)
  }

  // MODULO PREDICTIVO | SELECCION DE VARIABLES
  
  getDataSeleccion(form: any): any {
    return this.http.post<any>(`${this.basePredictiva}/seleccion/getData`, form, this.headers)
  }

  // MODULO PREDICTIVO | TRANSFORMACIONES

  postTransformaciones(form: any){
    return this.http.post<any>(`${this.basePredictiva}/transformaciones/procesar_datos`, form, this.headers)
  }

  getVariablesTransformaciones(carrera: string, semestre: number){
    return this.http.get<Diccionario[]>(`${this.basePredictiva}/transformaciones/getVariables/${carrera}/${semestre}`, this.headers)
  }

  // END MODULO PREDICTIVO
  
  // MODULO ANALITICA DIAGNOSTICA
  
  postDiagnostica(form: any){
    return this.http.post<any>(`${this.baseDiagnostica}/generar_graficas`, form, this.headers)
  }

  getVariablesDiagnostica(carrera: string, semestre: number){
    return this.http.get<Diccionario[]>(`${this.baseDiagnostica}/getVariables/${carrera}/${semestre}`, this.headers)
  }



}
