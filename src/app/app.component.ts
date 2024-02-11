import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from './Services/signalr.service';
import { NavMenuComponent } from "./Components/nav-menu/nav-menu.component";
import { HubConnection } from '@microsoft/signalr';
import { FooterComponent } from './Components/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavMenuComponent,FooterComponent]
})
export class AppComponent  {
  title = 'StockClient';
  constructor(public signalRService: SignalrService) {}

  // ngOnInit(): void {
  //   this.signalRService.startConnection();
  //   setTimeout(()=>{
  //     this.signalRService.askServerListener();
  //     this.signalRService.askServer();
  //   },2000);
  // }

  ngOnDestroy(): void {
    if(HubConnection != undefined)
    {
      //this.signalRService.hubConnection?.off("askServerResponse");
    }
    
  }
}
