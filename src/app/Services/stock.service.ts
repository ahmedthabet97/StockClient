import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) {
    
   }
   getStocks()
   {
    return this.http.get(`${environment.appUrl}/api/Stock/GetAllStocks`)
   }
}
