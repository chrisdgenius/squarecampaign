import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { CreateComponent } from './create/create.component';

import { SubscribeComponent } from './subscribe/subscribe.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CampaignComponent,
    CreateComponent,
    
    SubscribeComponent,
        ViewComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CampaignModule { }
