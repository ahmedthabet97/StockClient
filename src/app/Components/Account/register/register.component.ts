import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
registerForm: FormGroup = new FormGroup({});
  submitted =false;
  errorMessages : string [] = [];
  constructor(private accountService:AccountService,private formBuilder:FormBuilder, private router: Router)
  {}
  ngOnInit(): void {
    this.initializeform();
   
  }
initializeform()
{
  this.registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
  })
}
register() {
  this.submitted = true;
  this.errorMessages = [];
  this.accountService.register(this.registerForm.value).subscribe({
    next:(response)=>{
      console.log(response);
      this.router.navigateByUrl('/account/login');
    },
    error: error => {
      if (error.error.errors) {
        this.errorMessages = error.error.errors;
      } else {
        this.errorMessages.push(error.error);
      }
    }
    
  })

  }
  
}
