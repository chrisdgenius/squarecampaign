import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ViewpostsComponent } from './campaign/viewposts/viewposts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { NavbarComponent } from './nav/navbar/navbar.component';


const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'campaign/viewposts'},
 // {path:'', component: ViewpostsComponent },
//{path: '', component: NavbarComponent, children: [ { path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule) }, ]},
{ path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule) },
//{path:'campaign/viewposts', component: ViewpostsComponent },
//{path:'', component: NavbarComponent},
//{ path: '', component: DashboardComponent }, //home page

//{path:'', component: CampaignComponent },
//{path:'campaign', component: CampaignComponent },
//{path: '',  loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule) }, 
{ path: '', component: DashboardComponent }, //HOME PAGE
  { path: 'log-in', component: LoginComponent},
 // { path: '', component: LoginComponent},
  { path: 'register',component:SignupComponent},
  { path: 'wallet', loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule) },
  
 // { path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule) },
    
   

   //Authentication route
  // { path: '', pathMatch: 'full', redirectTo: 'log-in'},
 //  { path: 'log-in', component: LoginComponent},
 //  { path: 'register',component:SignupComponent},
 //  {path: 'profile', component:ProfileComponent},
  // { path: 'navbar', component: NavbarComponent },
   //{ path: 'dashboard',component:NavbarComponent,
   //children: [{ path: 'register',component:SignupComponent}
     
  // ]},
  // { path: 'dashboard', component: DashboardComponent },
  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
