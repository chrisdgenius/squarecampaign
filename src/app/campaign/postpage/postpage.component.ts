import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';
import { WalletService } from 'src/app/services/wallet.service';
import { campaignType } from 'src/app/model/campaign-type';

@Component({
  selector: 'app-postpage',
  templateUrl: './postpage.component.html',
  styleUrls: ['./postpage.component.css']
})
export class PostpageComponent implements OnInit {

  submitted = false;
  userId: string = ''; // from local storage
  userId2: string = '';// from route
  _id: string = '';
  name: string = '';
  price: number = 0;
  image: string = '';

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

 campaignDetail = <any>{};
 //campaignDetail:campaignType[] = [];





  constructor(
    private campaignService: CampaignService,
    public dialogRef: MatDialog,
    private observer: BreakpointObserver,
    private activatedRouted: ActivatedRoute,
    public authService: AuthService,
    private walletService:WalletService,
  ) {}

  ngOnInit(): void {
// choose the correct subcription plan
this.activatedRouted.params.subscribe((data) => {
  this._id = data.id;
  console.log(this._id);
    
    //localStorage.setItem('key_id', JSON.stringify(data.id) )
    let idData = this.authService.getToken()
      console.log('access_token', idData)
      this.userId = idData;
    // get the email from the login routerlink
    this.activatedRouted.params.subscribe((data) => {
      this.userId2 = data.id;
      console.log('my user detail:  ', this.userId);
     
      
      // this. getUser() ;
    });
    

  });
    this.getPost();
    
  }

  getPost() {
    this.campaignService.getOne(this._id).subscribe((res) => {
      this.campaignDetail = res;
      console.log('Available Campaign is', this.campaignDetail);
    });
  }


}
