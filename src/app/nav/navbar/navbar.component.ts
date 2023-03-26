import { Component, Input, OnInit, ViewChild , ElementRef} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';

import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userDetail = <any>{};
  data : any;
  userId: string = '';
 vard: number;
  //balance: any;
  balance: number = 0;
  walletDetail= <any>{};
  //campaignDetail = <any>{};
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  title= "SquareCampaign";
 


 
  constructor(
    private activatedRoute: ActivatedRoute,
    private observer: BreakpointObserver, 
    private authservice: AuthService,
    private walletService:WalletService,
     private router:Router,
     public authService: AuthService) { }
addLogSubscription:Subscription;
logs:Array<any>

 

  ngOnInit() {
    
    
    this.addLogSubscription=this.authservice.addLogs.subscribe(log => {
      this.authservice.logs.push(log);
      this.logs=this.authservice.logs
      console.log('the shared: ', this.logs);
      
     
     
          // GET THE DETAILS FROM THE DATABASE BY SUBSCRIBING TO THE  SERVICE
      this.userId = log;
      
      this.authService.getUserById(this.userId).subscribe((res) => {
        this.userDetail = res;
        console.log('the shared data 4: ',this.userDetail);
        

       
      });
     
     // const Balance= log
     this.walletbalance()
     // this.data=log;
     // console.log('the shared data 3: ', this.data._id)

    })

    
  }




  
  ngAfterViewInit() {

    setTimeout(()=>{


      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    },0)


    
    
  }


  logout() {
    this.authService.doLogout()
    
  }

  walletbalance() {
    //Note: The userId was added to the router url as id from the routerlink in the html ofthe parent component

   
      console.log(this.userId);
      this.walletService.walletBalance(this.userId).subscribe((walletData) => {
        this.walletDetail = walletData;
        console.log('UYI:  ',this.walletDetail);
       // this.Balance=this.walletDetail
      //  console.log('The Balance: ', this.Balance);
     
    });
  }

}
//First, we will declare an Observable ({1}) to receive the value emitted from the AuthService ({2}). We are using $ at the end of the Observable identifier. 
//This helps us while reading the code to identify which variables are Observables or not.