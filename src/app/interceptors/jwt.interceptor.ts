import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { User } from '../Models/User';
import { request } from 'express';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
 

  if (typeof window !== 'undefined') {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const user: User = JSON.parse(key);
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.jwt}`
        }
      });
    }         
  }
  return next(req);
};
