import { Component, OnInit } from '@angular/core';


import { CampaignService } from 'src/app/services/campaign.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  submitted = false;
  userId: string = '';

  name: string = '';
  price: number = 0;
  image: string = '';

  campaignDetail = <any>{};
  campaignDetail2 = <any>{};

  firstName: string = '';
  userDetail = <any>{};
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;


  balance: number = 0;
  walletDetail= <any>{};

  constructor(
    private campaignService: CampaignService,
    public dialogRef: MatDialog,
    private observer: BreakpointObserver,
    private activatedRouted: ActivatedRoute,
    public authService: AuthService,
    private walletService:WalletService,
  ) {}

  ngOnInit(): void {
   
    
    this.getAllPosts();
  //  this.walletbalance();
  }

  getAllPosts() {
    this.campaignService.getPost().subscribe((res) => {
      this.campaignDetail2 = res;
     // Sort For recent first:
       this.campaignDetail=  this.campaignDetail2.sort((b, a) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
       
      console.log('Available Campaigns are', this.campaignDetail);
    });
  }

 

  

 


}
