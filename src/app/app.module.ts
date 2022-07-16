import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignModule } from './campaign/campaign.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ForgotComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    
    //CampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CampaignModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
