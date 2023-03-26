import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MaterialModule } from '../material/material.module';
import { CampaignRoutingModule } from './campaign-routing.module';
//import { CampaignComponent } from './campaign.component';
import { CreateComponent } from './create/create.component';

import { SubscribeComponent } from './subscribe/subscribe.component';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { ViewpostsComponent } from './viewposts/viewposts.component';
import { PostpageComponent } from './postpage/postpage.component';


@NgModule({
  declarations: [
   // CampaignComponent,
    CreateComponent,
    
    SubscribeComponent,
        ViewComponent,
        PostComponent,
        ViewpostsComponent,
        PostpageComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    
  ]
})
export class CampaignModule { }
