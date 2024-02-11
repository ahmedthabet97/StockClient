import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { StockListComponent } from './Components/stock-list/stock-list.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';

export const routes: Routes = [
    {path:'',component:HomeComponent,pathMatch:'full'},
    {path:'stock',component:StockListComponent},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactUsComponent},
    {path:'not-found',component:NotFoundComponent},
    {path:'account',loadChildren:()=>import('./Components/Account/account.module').then(module=>module.AccountModule)},
    {path:'**',component:NotFoundComponent,pathMatch:'full'},
];
