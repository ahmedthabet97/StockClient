import { Injectable } from '@angular/core';
import { Register } from '../../Models/Register';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient:HttpClient) 
  { 
   
  }
  register(model:Register)
  {
    return this.httpClient.post(`${environment.appUrl}/api/account/register`,model);
  }

}
