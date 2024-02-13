import { Injectable } from '@angular/core';
import { Register } from '../../Models/Register';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../Models/Login';
import { User } from '../../Models/User';
import { json } from 'stream/consumers';
import { ReplaySubject, map } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
private userService =  new ReplaySubject<User|null>(1);
user$ = this.userService.asObservable();
  constructor(private httpClient:HttpClient){ }
  register(model:Register)
  {
    return this.httpClient.post(`${environment.appUrl}/api/account/register`,model);
  }
  Login(model:Login)
  {
    return this.httpClient.post<User>(`${environment.appUrl}/api/account/login`,model).pipe(
      map((user:User)=>{
        if(user)
        {
          this.setUser(user);
        }
      })
    )
  }
  private setUser(user:User){
    localStorage.setItem(environment.userKey,JSON.stringify(user));
    this.userService.next(user);

  }

}
