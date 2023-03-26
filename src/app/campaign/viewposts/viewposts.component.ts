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
  selector: 'app-viewposts',
  templateUrl: './viewposts.component.html',
  styleUrls: ['./viewposts.component.css'],
})
export class ViewpostsComponent implements OnInit {
  submitted = false;
  userId: string = ''; // from local storage
  userId2: string = '';// from route
  name: string = '';
  price: number = 0;
  image: string = '';

 // campaignDetail = <any>{};
 campaignDetail:campaignType[] = [];
 campaignDetail2:campaignType[] = [];
 // pageEmployes: Employe[] = [];



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
    private router: Router
  ) {}

  ngOnInit(): void {

    
    //localStorage.setItem('key_id', JSON.stringify(data.id) )
    let idData = this.authService.getToken()
      console.log('access_token', idData)
      this.userId = idData;
    // get the email from the login routerlink
    this.activatedRouted.params.subscribe((data) => {
      this.userId2 = data.id;
      console.log('my user detail:  ', this.userId);
     
      // GET THE DETAILS FROM THE DATABASE BY SUBSCRIBING TO THE  SERVICE
      this.authService.getUserById(this.userId).subscribe((currentData) => {
        this.userDetail = currentData;
        console.log('detail:', this.userDetail);
      });
      // this. getUser() ;
    });
    
    this.getAllPosts();
    this.walletbalance();
  }

  getAllPosts() {
    this.campaignService.getPost().subscribe((res) => {
      this.campaignDetail2 = res;
        // Sort For recent first:
        this.campaignDetail=  this.campaignDetail2.sort((b, a) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
      console.log('Available Campaigns are', this.campaignDetail);
    });
  }

  getUser() {
    // get the id from the login routerlink
    

      this.authService.getUserById(this.userId).subscribe((res) => {
        (currentUser) => {
          this.userDetail = currentUser;
          console.log(this.userDetail);
        };
      });
   
  }

  openDialog1() {
    this.dialogRef.open(PostComponent, {
      height: '70%',
      width: '50%',
    });
  }
  openDialog2() {
    this.dialogRef.open(PostComponent, {
      height: '100%',
      width: '100%',
    });
  }

  openDialog() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.openDialog2();
      } else {
        this.openDialog1();
      }
    });
  }


  walletbalance() {
    //Note: The userId was added to the router url as id from the routerlink in the html ofthe parent component

   
      console.log(this.userId);
      this.walletService.walletBalance(this.userId).subscribe((walletData) => {
        this.walletDetail = walletData;
      //  console.log(this.walletDetail);
       // this.Balance=this.walletDetail
      //  console.log('The Balance: ', this.Balance);
     
    });
  }
}
