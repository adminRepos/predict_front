import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginHttpService } from '../../service/login-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  @ViewChild('toggleModal') toggleModal!: ElementRef;

  constructor(private fb: FormBuilder, private router:Router, private loginHttp: LoginHttpService) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  login(){
    let token : string = ''
    this.loginHttp.login(this.loginForm.value)
      .subscribe({
        next: (res:any)=>{
          // if(res['token']){
          //   token = res['token']
          // }
          token = res['access_token']
          localStorage.setItem('UD_Token',token)
          console.log(localStorage.getItem('UD_Token'))
        },
        error: ()=>{
          this.toggleModal.nativeElement.click();
        },
        complete: ()=>this.router.navigateByUrl('/profile')
      })

  }

}
