import { ModuloPracticoComponent } from './pages/modulo-practico/modulo-practico.component';
import { ProfileComponent } from './profile.component';
import { AnaliticaPredictivaComponent } from './pages/analitica-predictiva/analitica-predictiva.component';
import { TransformacionesComponent } from './components/transformaciones/transformaciones.component';
import { AnaliticaDescriptivaComponent } from './pages/analitica-descriptiva/analitica-descriptiva.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CargaLimpiezaComponent } from './pages/carga-limpieza/carga-limpieza.component';
import { CargaLimpiezaNewComponent } from './pages/carga-limpieza-new/carga-limpieza-new.component';
import { AnaliticaDiagnosticaComponent } from './pages/analitica-diagnostica/analitica-diagnostica.component';

const routes: Routes = [
  {
    path:'',
    component: ProfileComponent,
    children:[
      // {path: 'carga', component: CargaLimpiezaComponent},
      {path: 'carga', component: CargaLimpiezaNewComponent},
      {path: 'descriptiva', component: AnaliticaDescriptivaComponent },
      {path: 'diagnostica', component: AnaliticaDiagnosticaComponent },
      {path: 'predictiva', component: AnaliticaPredictivaComponent},
      {path: 'practico', component: ModuloPracticoComponent},
      {path: '**', redirectTo: 'carga'}
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
