import { DataNewPassword } from './../../interface/auth.interface';
import { LoginHttpService } from './../../service/login-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {

  loginForm: FormGroup;

  ID!: string;

  @ViewChild('toggleModal') toggleModal!: ElementRef;

  error_passwords_flag: boolean = false;

  message: string = 'La contraseña se ha actualizado con éxito'

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private router_id: ActivatedRoute,
    private loginHttp: LoginHttpService) {

    this.loginForm = this.fb.group({
      pass: [''],
      confirm_pass: ['']
    })
    router_id.params.subscribe(param=>{
      if(typeof(param['id'])=="string"){
        this.ID = param['id']
      }
    })
  }

  ngOnInit(): void {
  }

  save_password(){

    if(this.loginForm.controls['pass'].value!=this.loginForm.controls['confirm_pass'].value){

      this.message = 'Las contraseñas no coinciden'
      this.error_passwords_flag = true;
      this.toggleModal.nativeElement.click();
    }
    else{

      this.error_passwords_flag = false;

      let data: DataNewPassword = {
        token: this.ID+'adf',
        new_password: this.loginForm.controls['pass'].value
      }

      this.loginHttp.save_password(data).subscribe({
        next: (res:any)=>{
          console.log(res)
        },
        error: ()=>{
          this.message = 'Hubo un error en la actualizacion de contraseña'
          this.toggleModal.nativeElement.click();
        },
        complete: ()=>{
          this.message =  'La contraseña se ha actualizado con éxito';
          this.toggleModal.nativeElement.click();
        }
      })

    }
  }

  goToLogin(){
    this.router.navigateByUrl('/login')
  }

}
