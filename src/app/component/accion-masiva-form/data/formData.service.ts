import { Injectable } from '@angular/core';

import { FormData } from './formData.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();



    //Get Personal Tab Data

    setDatosArchivo(data){

        this.formData.lineas = data
    
    }

    //Set Personal Tab Data
    setDatosPrimerFormulario(data: FormData) {
        // Update the Personal data only when the Personal Form had been validated successfully
       
        this.formData.nro_trans = 0;
        this.formData.fecha = data.fecha;
        this.formData.id_motivo_mov_stk = data.id_motivo_mov_stk;
        this.formData.serie_guia = data.serie_guia;
        this.formData.nro_guia = data.nro_guia;
        this.formData.dicose = data.dicose;


    }
    setDatosSegundoFormulario(data: FormData) {
        // Update the Personal data only when the Personal Form had been validated successfully
       
        this.formData.id_propiedad_ganado = data.id_propiedad_ganado;
        this.formData.id_tipo_ganado = data.id_tipo_ganado;
        this.formData.id_raza_ganado = data.id_raza_ganado;
        this.formData.id_categoria_ganado = data.id_categoria_ganado;
        this.formData.peso_total_real = data.peso_total_real;
        this.formData.peso_total_facturado = data.peso_total_facturado;
        this.formData.id_tipo_peso = data.id_tipo_peso;
        this.formData.cantidad_total = data.cantidad_total;
        

    }

    setDatosArticulo(data){
        this.formData.cod_articulo = data;
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        ///this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        //this.formData.clear();
        //this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }


}