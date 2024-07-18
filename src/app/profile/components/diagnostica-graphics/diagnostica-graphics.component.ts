import { AfterViewChecked, Component, DoCheck, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { DatosGraficas } from '../../interfaces/shared.interface';


@Component({
  selector: 'app-diagnostica-graphics',
  templateUrl: './diagnostica-graphics.component.html',
  styleUrls: ['./diagnostica-graphics.component.css']
})
export class DiagnosticaGraphicsComponent implements OnInit {

  public chart: any[] = []

  colorList:string[] = ['#ff0080','#1ee853','#fbb217','#8c1919','#0ae1f0']

  @Input() filterText: string = '';
  @Input() prueba!: DatosGraficas[]

  optionsGraphic= {
    aspectRatio:1.5,
    plugins:{
      legend:{
        display: false
      }
    },
    scales:{
      x:{
        grid:{
          display: true
        },
        ticks:{
          display: false
        }
      },
      y:{
        grid:{
          display: false
        },
        ticks:{
          display: false
        }
      }
    }
  }

  graphicValidator:{[key:string]:boolean} = {
    chart0: true,
    chartBig01: true,
    chartBig02: false,
    chartBig03: false,
    chartBig04: false,
    chartSmall01: true,
    chartSmall02: true,
    chartSmall03: true,
    chartSmall04: true,
    chart1: true,
    chartBig11: true,
    chartBig12: false,
    chartBig13: false,
    chartBig14: false,
    chartSmall11: true,
    chartSmall12: true,
    chartSmall13: true,
    chartSmall14: true,
    chart2: true,
    chartBig21: true,
    chartBig22: false,
    chartBig23: false,
    chartBig24: false,
    chartSmall21: true,
    chartSmall22: true,
    chartSmall23: true,
    chartSmall24: true,
    chart3: true,
    chartBig31: true,
    chartBig32: false,
    chartBig33: false,
    chartBig34: false,
    chartSmall31: true,
    chartSmall32: true,
    chartSmall33: true,
    chartSmall34: true,
  }

  transformation_selected = [0,0,0,0]

  constructor() {
  }

  ngOnInit(): void {
    this.createChart()
  }

  createChart(){
    let graphValues: DatosGraficas[] = this.prueba

    this.chart.push(this.generateChart('chart0',0,0));
    this.chart.push(this.generateChart('chartBig01',0,1));
    this.chart.push(this.generateChart('chartBig02',0,2));
    this.chart.push(this.generateChart('chartBig03',0,3));
    this.chart.push(this.generateChart('chartBig04',0,4));
    this.chart.push(this.generateChart('chartSmall01',0,1));
    this.chart.push(this.generateChart('chartSmall02',0,2));
    this.chart.push(this.generateChart('chartSmall03',0,3));
    this.chart.push(this.generateChart('chartSmall04',0,4));

    this.chart.push(this.generateChart('chart1',1,0));
    this.chart.push(this.generateChart('chartBig11',1,1));
    this.chart.push(this.generateChart('chartBig12',1,2));
    this.chart.push(this.generateChart('chartBig13',1,3));
    this.chart.push(this.generateChart('chartBig14',1,4));
    this.chart.push(this.generateChart('chartSmall11',1,1));
    this.chart.push(this.generateChart('chartSmall12',1,2));
    this.chart.push(this.generateChart('chartSmall13',1,3));
    this.chart.push(this.generateChart('chartSmall14',1,4));

    this.chart.push(this.generateChart('chart2',2,0));
    this.chart.push(this.generateChart('chartBig21',2,1));
    this.chart.push(this.generateChart('chartBig22',2,2));
    this.chart.push(this.generateChart('chartBig23',2,3));
    this.chart.push(this.generateChart('chartBig24',2,4));
    this.chart.push(this.generateChart('chartSmall21',2,1));
    this.chart.push(this.generateChart('chartSmall22',2,2));
    this.chart.push(this.generateChart('chartSmall23',2,3));
    this.chart.push(this.generateChart('chartSmall24',2,4));

    this.chart.push(this.generateChart('chart3',3,0));
    this.chart.push(this.generateChart('chartBig31',3,1));
    this.chart.push(this.generateChart('chartBig32',3,2));
    this.chart.push(this.generateChart('chartBig33',3,3));
    this.chart.push(this.generateChart('chartBig34',3,4));
    this.chart.push(this.generateChart('chartSmall31',3,1));
    this.chart.push(this.generateChart('chartSmall32',3,2));
    this.chart.push(this.generateChart('chartSmall33',3,3));
    this.chart.push(this.generateChart('chartSmall34',3,4));
  }

  generateChart(name:string,label_index:number,data_index:number){

    let graphValues: DatosGraficas[] = this.prueba

    if(graphValues.length<label_index+1){
      this.graphicValidator[name] = false;
      return this.voidChart(name)
    }
    if(graphValues[label_index].data.length<data_index+1){
      this.graphicValidator[name] = false;
      return this.voidChart(name)
    }

    return new Chart(name, {
      type: 'line',

      data: {
        labels: graphValues[label_index].labels,
	       datasets: [
          {
            data: graphValues[label_index].data[data_index],
            borderColor: this.colorList[data_index],
            tension: 0.4,
            pointRadius: name[5]=='S'?0:5
          }
        ]
      },
      options: this.optionsGraphic
    })

  }

  voidChart(name:string){
    return new Chart(name, {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [],
         datasets: [
          {
            data: [],
            borderColor: '#000',
            tension: 0.4
          }
        ]
      },
      options: this.optionsGraphic
    })
  }

  getVariable(value: number):string{
    if(this.prueba[value]){
      return this.prueba[value].variable
    }
    return ''
  }

  getLegend(value1:number,value2:number){
    if(this.prueba[value1]){
      if(this.prueba[value1].legend[value2]){
        return this.prueba[value1].legend[value2]
      }
      return ''
    }
    return ''
  }

  seleccionarGrafica(graficaName: string){
    let variable_group = graficaName[graficaName.length-2]
    let transformation_value = graficaName[graficaName.length-1]
    let transformation_list =  ['1','2','3','4']

    transformation_list.forEach((transformation)=>{
      this.graphicValidator[`chartBig${variable_group}${transformation}`] = false
    })
    this.graphicValidator[`chartBig${variable_group}${transformation_value}`] = true

    this.transformation_selected[parseInt(variable_group)] = parseInt(transformation_value)-1
  }

}
