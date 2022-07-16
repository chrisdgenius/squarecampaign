import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { CreateComponent } from './create/create.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: '', component: CreateComponent },
 { path: 'view', component: ViewComponent },
 { path: 'subscribe/:id', component: SubscribeComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
