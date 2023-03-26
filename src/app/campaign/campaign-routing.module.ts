import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { PostComponent } from './post/post.component';
import { PostpageComponent } from './postpage/postpage.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ViewComponent } from './view/view.component';
import { ViewpostsComponent } from './viewposts/viewposts.component';


const routes: Routes = [
 // { path: '', component: ViewpostsComponent }, //home page
  { path: 'create', component: CreateComponent },
  { path: 'subscribe/:id', component: SubscribeComponent },
  //{ path: 'post', component: PostComponent },
  { path: 'viewposts/:id', component: ViewpostsComponent },
  { path: 'viewposts', component: ViewpostsComponent },
  { path: 'view', component: ViewComponent },
  { path: 'postpage/:id', component: PostpageComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
