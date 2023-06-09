import { Component, ViewChild } from '@angular/core';

declare var require: any;
const data: any = require('./company.json');


@Component({
  selector: 'app-vista-rapida-ganado',
  templateUrl: './vista-rapida-ganado.component.html',
  styleUrls: ['./vista-rapida-ganado.component.scss']
})
export class VistaRapidaGanadoComponent {
  editing:any = {};
  rows: any = new Array;
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'Caravana' }, { name: 'Categoria' }, { name: 'Lote' }, 
  { name: 'Peso' },{ name: 'Un' },{ name: 'Propio' },{ name: 'Dicose' }];

  @ViewChild(VistaRapidaGanadoComponent) table: VistaRapidaGanadoComponent | any;

  constructor() {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.Caravana.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event:any, cell:any, rowIndex:number) {
    
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows]; 
    
  }
}
