import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
//   // hubConnection?:signalR.HubConnection ;
//   // constructor() { 
//     /*this.hubConnection = new signalR.HubConnectionBuilder()
//     .withUrl('https://localhost:7198/stockHub') // Replace with the actual hub URL
//     .build();*/
//    //}



//   startConnection = () => {
//       // this.hubConnection = new signalR.HubConnectionBuilder()
//       // .withUrl('https://localhost:7198/stockHub', {
//       //     skipNegotiation: true,
//       //     transport: signalR.HttpTransportType.WebSockets
//       // })
//       // .build();
  
//       // this.hubConnection
//       // .start()
//       // .then(() => {
//       //     console.log('Hub Connection Started!');
//       //})
//       //.catch(err => console.log('Error while starting connection: ' + err))
//   }
//   askServer() {
//   //   console.log("AskServerStart")
//   //   this.hubConnection?.invoke("CrudData", "hi")
//   //       .catch(err => console.error(err));
//   //  console.log("AskServerEnd")
// }

// askServerListener() {
//   // console.log("askServerListener Start")
//   //   this.hubConnection?.on("askServerResponse", (someText) => {
//   //       console.log(someText);
        
// //     })
// //     console.log("askServerListener End")
// // }
// }
}