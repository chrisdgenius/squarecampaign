import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CampaignComponent } from './campaign/campaign.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { NavbarComponent } from './nav/navbar/navbar.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'log-in'},
{
  path: '',                       // {1}
    component: NavbarComponent,
  children: [
    {path: 'profile', component:ProfileComponent},
    { path: 'dashboard', component: DashboardComponent },
  //  {path:'campaign', component: CampaignComponent},
    { path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule) },

  ]
},

    
      { path: 'log-in', component: LoginComponent},
      { path: 'register',component:SignupComponent},
    


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
  // { path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule) },
    
   
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
