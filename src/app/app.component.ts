import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from './Services/signalr.service';
import { NavMenuComponent } from "./Components/nav-menu/nav-menu.component";
import { HubConnection } from '@microsoft/signalr';
import { FooterComponent } from './Components/footer/footer.component';
import { AccountService } from './Components/Account/account.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavMenuComponent,FooterComponent]
})
export class AppComponent implements OnInit {

  constructor(public signalRService: SignalrService,private accountService:AccountService) {}
  ngOnInit(): void {

    this.refreshUser()
  }
  private refreshUser()
  {
    const jwt = this.accountService.getJWT()
    if(jwt){
      this.accountService.refreshUser(jwt).subscribe(
        {
          next:response=>{},
          error:error =>{
            this.accountService.logOut();
          }
        }
      )
    }else{
      this.accountService.refreshUser(null).subscribe();
    }
  }
  ngOnDestroy(): void {
    if(HubConnection != undefined)
    {
      //this.signalRService.hubConnection?.off("askServerResponse");
    }
    
  }
}
