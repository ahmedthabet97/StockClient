import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../../../Components/Account/account.service';
import { User } from '../../../Models/User';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn :'root'
})
export class authorizationGuard {
constructor(private accountServie:AccountService,private router:Router){

}
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> {
  return this.accountServie.user$.pipe(
    map((user: User | null) => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    })
  );
}

}