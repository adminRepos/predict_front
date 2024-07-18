import { RecoverComponent } from './pages/recover/recover.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { NewPassComponent } from './pages/new-pass/new-pass.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: '', component: LoginComponent},
      {path: 'recovery', component: RecoverComponent},
      {path: 'new/:id', component: NewPassComponent},
      {path: '**', redirectTo: ''}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
