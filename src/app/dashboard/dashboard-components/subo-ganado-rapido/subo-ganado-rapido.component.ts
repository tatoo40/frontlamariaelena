import { Component, ViewChild } from '@angular/core';
import { CsvService } from '../../../service/csv.service';
import { CargaGanado } from 'src/app/model/carga_ganado.model';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


declare var require: any;
const data: any = [];


@Component({
  selector: 'app-subo-ganado-rapido',
  templateUrl: './subo-ganado-rapido.component.html',
  styleUrls: ['./subo-ganado-rapido.component.scss']
})
export class SuboGanadoRapidoComponent {
 
  constructor(private CsvService:CsvService, private modalService: NgbModal) { 

  }

 

  modalOpenRegiser(modalRegiser: any) {
    this.modalService.open(modalRegiser);
  }


}
