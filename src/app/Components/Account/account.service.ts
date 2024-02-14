import { Injectable } from '@angular/core';
import { Register } from '../../Models/Register';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../../Models/Login';
import { User } from '../../Models/User';
import { json } from 'stream/consumers';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
private userService =  new ReplaySubject<User|null>(1);
user$ = this.userService.asObservable();
  constructor(private httpClient:HttpClient,private router:Router){ }
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
  getJWT(){
    if (typeof window !== 'undefined') {
      const key = localStorage.getItem(environment.userKey);
      if (key) {
        const user: User = JSON.parse(key);
        return user.jwt;
      } }
        return null;
    
    }
  refreshUser(jwt:string|null)
  {
    if (jwt === null) {
      this.userService.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.httpClient.get<User>(`${environment.appUrl}/api/account/RefreshUserToken`, {headers}).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    ) 
  }
logOut(){
  localStorage.removeItem(environment.userKey)
  this.userService.next(null)
  this.router.navigateByUrl('/account/login');
}
}
