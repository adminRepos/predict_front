import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CargaLimpiezaComponent } from './pages/carga-limpieza/carga-limpieza.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AnaliticaDescriptivaComponent } from './pages/analitica-descriptiva/analitica-descriptiva.component';
import { TransformacionesComponent } from './components/transformaciones/transformaciones.component';
import { AnaliticaPredictivaComponent } from './pages/analitica-predictiva/analitica-predictiva.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './profile.component';
import { ModuloPracticoComponent } from './pages/modulo-practico/modulo-practico.component';
import { CargaDataComponent } from './components/carga-data/carga-data.component';
import { CargaConvencionesComponent } from './components/carga-convenciones/carga-convenciones.component';
import { CargaHistorialComponent } from './components/carga-historial/carga-historial.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DiagnosticaGraphicsComponent } from './components/diagnostica-graphics/diagnostica-graphics.component';
import { AnaliticaDiagnosticaComponent } from './pages/analitica-diagnostica/analitica-diagnostica.component';
import { MultiselectAutocompleteComponent } from './components/multiselect-autocomplete/multiselect-autocomplete.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import { DinamicInputComponent } from './components/dinamic-input/dinamic-input.component';
import { PracticoIndividualComponent } from './components/practico-individual/practico-individual.component';
import { PracticoGrupalComponent } from './components/practico-grupal/practico-grupal.component';
import { HiperparametrosComponent } from './components/hiperparametros/hiperparametros.component';
import { SeleccionVariablesComponent } from './components/seleccion-variables/seleccion-variables.component';
import { CargaLimpiezaNewComponent } from './pages/carga-limpieza-new/carga-limpieza-new.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations'




@NgModule({
  declarations: [
    CargaLimpiezaComponent,
    AnaliticaDescriptivaComponent,
    TransformacionesComponent,
    AnaliticaPredictivaComponent,
    SidebarComponent,
    ProfileComponent,
    ModuloPracticoComponent,
    CargaDataComponent,
    CargaConvencionesComponent,
    CargaHistorialComponent,
    LoadingComponent,
    DiagnosticaGraphicsComponent,
    AnaliticaDiagnosticaComponent,
    MultiselectAutocompleteComponent,
    DinamicInputComponent,
    PracticoIndividualComponent,
    PracticoGrupalComponent,
    HiperparametrosComponent,
    SeleccionVariablesComponent,
    CargaLimpiezaNewComponent,
    DynamicTableComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule
    // BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
