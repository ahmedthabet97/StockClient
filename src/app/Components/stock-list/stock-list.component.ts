import { Component, OnInit } from '@angular/core';
import { StockService } from '../../Services/stock.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [],providers:[
    //{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit{
message :string = ""
  constructor(private stockService:StockService){

  }
  ngOnInit(): void {
    this.stockService.getStocks().subscribe({
      next:(response:any)=>{
        this.message = response.value
        console.log(response.value)},
      error:error=>{console.log(error),this.message=error.message}
    })
  }

}
