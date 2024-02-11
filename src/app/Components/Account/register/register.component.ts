import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountModule } from '../account.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AccountModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
registerForm: FormGroup = new FormGroup({});
  submitted =false;
  errorMessages : string [] = [];
  constructor(private accountService:AccountService,private formBuilder:FormBuilder)
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
    },
    error: error=>{
      console.log(error);
    }
    
  })

  }
}