import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  constructor(private accountService:AccountService,private formBuilder:FormBuilder, private router: Router)
  {}
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
          console.log(response)
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
