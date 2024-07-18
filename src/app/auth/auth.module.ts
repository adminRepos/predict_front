import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPassComponent } from './pages/new-pass/new-pass.component';
import { RecoverComponent } from './pages/recover/recover.component';


@NgModule({
  declarations: [
    LoginComponent,
    NewPassComponent,
    RecoverComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
