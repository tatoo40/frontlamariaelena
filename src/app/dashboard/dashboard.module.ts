import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardComponent } from './dashboard.component';
import { ProjectCounterComponent } from './dashboard-components/project-counter/project-counter.component';
import { SuboGanadoRapidoComponent } from './dashboard-components/subo-ganado-rapido/subo-ganado-rapido.component';
import { ClimaComponent } from './dashboard-components/clima/clima.component';
import { VistaRapidaGanadoComponent } from './dashboard-components/vista-rapida-ganado/vista-rapida-ganado.component';
import { CsvService } from '../service/csv.service';
import { AccionMasivaFormComponent } from '../component/accion-masiva-form/accion-masiva-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDataService } from '../component/accion-masiva-form/data/formData.service';
import { DdMmYYYYDatePipe} from '../dd-mm-yyyy-date.pipe'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    },
    component: DashboardComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),NgxDatatableModule,ReactiveFormsModule,],
  declarations: [DashboardComponent,ProjectCounterComponent, SuboGanadoRapidoComponent, ClimaComponent, VistaRapidaGanadoComponent,AccionMasivaFormComponent,DdMmYYYYDatePipe],
  providers:[CsvService,FormDataService]
})
export class DashboardModule {}
