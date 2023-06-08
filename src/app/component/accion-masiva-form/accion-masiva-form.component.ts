
import { Component, OnInit, ViewChild } from '@angular/core';
import { CsvService } from '../../service/csv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup,  FormBuilder, Validators, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { FormData } from './data/formData.model';
import { FormDataService } from './data/formData.service';
import { CargaMasivaService } from 'src/app/service/carga-masiva.service';
import Swal from 'sweetalert2'

declare var require: any;
const data: any = [];



@Component({
  selector: 'app-accion-masiva-form',
  templateUrl: './accion-masiva-form.component.html',
  styleUrls: ['./accion-masiva-form.component.scss']
})

export class AccionMasivaFormComponent  implements OnInit{



  segundoPasoForm: FormGroup;
  tercerPasoForm: FormGroup;
  cuartoPasoForm: FormGroup;

  estadoGanado = JSON.parse(localStorage.getItem("estadoGanado"));
  motivosMovimiento = JSON.parse(localStorage.getItem("motivosMovimiento"));

  tipoGanado = JSON.parse(localStorage.getItem("tipoGanado"));
  razaGanado = JSON.parse(localStorage.getItem("razas"));
  categoriaGanado = JSON.parse(localStorage.getItem("categoriaGanado"));
  razaGanadoOrigin = JSON.parse(localStorage.getItem("razas"));
  categoriaGanadoOrigin = JSON.parse(localStorage.getItem("categoriaGanado"));
  tipoPeso = JSON.parse(localStorage.getItem("tipoPeso"));
  articulos = JSON.parse(localStorage.getItem("articulos"));

  idMotivoFiltro = 0;
  idTipoGanado = 0;

  form: any;

  editing:any = {};
  rows: any = new Array;
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;
  noPasoAun:boolean=false
  existeCaravana:boolean;


  pasoUno:boolean=true;
  pasoDos:boolean=false
  pasoTres:boolean=false;
  pasoCuatro:boolean=false;
  pesoTotal:number=0;
  cantidad_total:number=0;
  pesoTotalFacturado:number=0;
  dateNow: Date = new Date();
  
  

  private datos: FormData = new FormData();



  columns = [{ prop: 'caravana' },{ name: 'fecha' }, { name: 'hora' }, 
  { name: 'peso' }];

  @ViewChild(AccionMasivaFormComponent) table: AccionMasivaFormComponent | any;
  id_propiedad_ganado: any;




  constructor(private CsvService:CsvService, private modalService: NgbModal, private fb: FormBuilder,
    private formDataService: FormDataService, private cargaMasivaService: CargaMasivaService) { 

    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
    this.createForm();


    
  }


  ngOnInit() {
 
     this.tercerPasoForm.get('id_tipo_ganado').valueChanges.subscribe((id_tipo_ganado) => {
      //console.log(tipoGanado)
      this.tercerPasoForm.get('id_raza_ganado').reset();
      //this.tercerPasoForm.get('razaGanado').disable();
      if (id_tipo_ganado) {
        //console.log("El valor del ganado")
        //console.log(tipoGanado)
        this.razaGanado = this.filtrarRazas(this.razaGanadoOrigin,id_tipo_ganado);

        this.categoriaGanado = this.filtrarCategorias(this.categoriaGanadoOrigin,id_tipo_ganado);
        //this.razaGanado.disable();
      }
    });



    const currentDate = new Date().toISOString().substring(0, 10);
    this.segundoPasoForm.controls['fecha'].setValue(currentDate);
    this.tercerPasoForm.controls['id_propiedad_ganado'].setValue(1);
    this.tercerPasoForm.controls['id_tipo_ganado'].setValue(1);
    this.tercerPasoForm.controls['id_tipo_peso'].setValue(1);
    this.cuartoPasoForm.controls['campo'].setValue(1);
    
}
  savePrimerFormulario(form: any) {
      if (!form.valid)
          return;

          this.formDataService.setDatosPrimerFormulario(form.value);

  }

  saveSegundoFormulario(form: any) {
    if (!form.valid)
        return;

        //Asigno la suma de los pesos reales de los bichos
        form.value.peso_total_real = this.pesoTotal;

        //Asigno la cantidad total de bichos
        form.value.cantidad_total = this.cantidad_total;

        // Construyo el objeto y asigno valores
        this.formDataService.setDatosSegundoFormulario(form.value);

        this.pesoTotalFacturado = form.value.peso_total_facturado;
        // Obtengo el articulo en funcion de la categoria de ganado y de la raza
        const articulo = this.buscoArticulo(form.value.id_categoria_ganado,form.value.id_raza_ganado);


        this.formDataService.setDatosArticulo(articulo[0].cod_articulo)

        //console.log(this.formDataService.getFormData());
        
        //this.datos = form.value;
        
        

}  

  createForm() {

    this.segundoPasoForm = this.fb.group({
       fecha: [this.dateNow, Validators.required ],
       id_motivo_mov_stk: ['', Validators.required ],
       serie_guia: ['', Validators.required ],
       nro_guia: ['', Validators.required ],
       dicose: ['', Validators.required ]
    });

    this.tercerPasoForm = this.fb.group({
      id_propiedad_ganado: ['', Validators.required ],
      id_tipo_ganado: ['', Validators.required ],
      id_raza_ganado: ['', Validators.required ],
      id_categoria_ganado: ['', Validators.required ],
      id_tipo_peso: ['', Validators.required ],
      peso_total_facturado:['', Validators.required ]
 
   });

   this.cuartoPasoForm = this.fb.group({
    campo: ['0']
  

    });  


  }



  public importedData: Array<any> = [];


  public async importDataFromCSV(event: any) {
    

    this.noPasoAun = true;

    let fileContent = await this.getTextFromFile(event);
    

    this.importedData = this.CsvService.importDataFromCSV(fileContent);
    //console.log('aca disparo');
    //console.log(this.importedData)

    this.existeCaravana = this.CsvService.verificoDatosSubidos(this.importedData);

    this.rows = this.importedData;


    this.pesoTotal = this.CsvService.sumarPesoGanado(this.importedData);

    this.cantidad_total = this.importedData.length;

    this.temp = [...this.importedData];
    
    this.formDataService.setDatosArchivo(this.importedData);

    this.formDataService.getFormData();

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);

  }

  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    return fileContent;
  }




  updateFilter(event:any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.caravana.toLowerCase().indexOf(val) !== -1 || !val;
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

  modalOpenRegiser(modalRegiser: any) {
    this.modalService.open(modalRegiser);
  }

  submitPasoUno(form: any, motivo:number) {
    if (!form.valid)
        return;
    
    

    this.idMotivoFiltro = motivo

    this.pasoUno = false;
    this.pasoDos = true;
    this.pasoTres = false;
    this.pasoCuatro=false;
  
  }


  buscoArticulo(id_categoria:number, id_raza:number){

    return this.articulos.filter(m=>m.id_categoria == id_categoria && m.id_raza == id_raza)
  
  }

  filtrarMotivo(motivos: any[]):any[]{
      return motivos.filter(m=>m.id_tipo_motivo == this.idMotivoFiltro)
  }

  filtrarRazas(razas: any[], filtroId: number):any[]{

    return razas.filter(m=>m.id_tipo_ganado == filtroId)
  }

  filtrarCategorias(categorias: any[],filtroId:number):any[]{
    return categorias.filter(m=>m.id_tipo_ganado == filtroId)
  }

  submitPasoDos(form:any){
    if (!form.valid)
        return;
      //console.log(form.fecha)
      this.savePrimerFormulario(form);
      this.pasoUno = false;
      this.pasoDos = false;
      this.pasoTres = true;
      this.pasoCuatro=false;

  }
  submitPasoTres(form:any){
    if (!form.valid)
        return;
    //console.log(form.fecha)
    this.saveSegundoFormulario(form);
    this.pasoUno = false;
    this.pasoDos = false;
    this.pasoTres = false;
    this.pasoCuatro=true;
  }
  submitPasoCuatro(form:any){
    if (!form.valid)
        return;
    //console.log(form.fecha)
    // No se si corresponde chequear algo
    // Grabo datos
    //console.log(this.formDataService)
    //console.log(this.datos)

    var myJsonString = JSON.stringify(this.formDataService);
    console.log(myJsonString)

    this.cargaMasivaService.crearUsuario(this.datos).subscribe(resp=>{


      //this.router.navigateByUrl('/');

    },(err)=>{
      
      Swal.fire('Error',err.error.message,'error')
      
    });


  }
  


}

