import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { User } from '../../../Models/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;
  constructor(
    private accountService:AccountService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router: Router)
  {
    this.accountService.user$.pipe(take(1)).subscribe({
      next:(user:User|null)=>{
        if(user){
          this.router.navigateByUrl('/')
      }else{
        this.activatedRoute.queryParamMap.subscribe({
          next:(params:any)=>{
            if(params){
              this.returnUrl= params.get('returnUrl')
            }
          }
        })
      }
      }
    })
  }
  ngOnInit(): void {
    this.initializeform()
  }
  initializeform()
{
  this.loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  })
}
  login()
  {
    this.submitted = true;
    this.errorMessages = [];
    if(this.loginForm.valid)
    {
      this.accountService.Login(this.loginForm.value).subscribe({
        next:(response:any)=>{
          if(this.returnUrl){
            this.router.navigateByUrl(this.returnUrl);
          }else{
            this.router.navigateByUrl('/')
          }
        
        },
        error:error=>{
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
        }}
      })
    }

  }
}
