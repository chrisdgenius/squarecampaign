import { Component, OnInit } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //isLogIn$: Observable<boolean>;                  // {1}
  isLoggedIn$: (userName: any, password: any) => Observable<import("c:/Users/Chris/Desktop/Angular/squarecampaign/UI/squarecampaign/src/app/model/user").User>;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.isLoggedIn$ = this.authService.logIn; // {2}
    
  }

  onLogout(){
  //  this.authService.logout();                      // {3}
  }

}
//First, we will declare an Observable ({1}) to receive the value emitted from the AuthService ({2}). We are using $ at the end of the Observable identifier. 
//This helps us while reading the code to identify which variables are Observables or not.