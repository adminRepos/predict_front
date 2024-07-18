import { LoginHttpService } from './../../service/login-http.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  loginForm: FormGroup;

  @ViewChild('toggleModal') toggleModal!: ElementRef;

  constructor(private fb: FormBuilder, private router:Router, private loginHttp: LoginHttpService) {
    this.loginForm = this.fb.group({
      email: ['']
    })
  }

  ngOnInit(): void {
  }

  recovery(){
    this.loginHttp.recovery(this.loginForm.controls['email'].value).subscribe({
      next:(res:any)=>{
        console.log(res['status'])
      },
      error: ()=>{},
      complete: ()=>{
        this.toggleModal.nativeElement.click();
      }
    })
  }

  regresar(){
    this.router.navigateByUrl('/login')
  }

}
