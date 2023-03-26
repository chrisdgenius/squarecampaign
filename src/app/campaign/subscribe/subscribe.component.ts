import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { campaignType } from 'src/app/model/campaign-type';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service'; // to get the customer id
//import flutterwave
import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent implements OnInit {
  subscribeForm: FormGroup;
  submitted = false;
  userId: string = '';
  userDetail = <any>{};
  campaignName: string = '';
  campaignDetail: any;
  customerDetails = <any>{};

  publicKey = 'FLWPUBK_TEST-05fb0f05a47123563819869d99d20de6-X';
  customizations = {
    title: 'Squarecampaign',
    description: 'Subcription to reach the world',
    logo: 'https://miro.medium.com/max/2400/1*Z1GByNW4KCR8HNCUjbgzdA.png',
  };

  constructor(
    public fb: FormBuilder,
    private activatedRouted: ActivatedRoute,
    private CampaignService: CampaignService,
    public authService: AuthService,
    private flutterwave: Flutterwave
  ) {
    this.subscribeForm = this.fb.group({
      amount: [''],
    });
  }
  //Note: The campaignName was added to the router url as id
  ngOnInit() {
    // choose the correct subcription plan
    this.activatedRouted.params.subscribe((data) => {
      this.campaignName = data.id;
      console.log(this.campaignName);

      //get the customerid fom token
      let idData = this.authService.getToken();
      console.log('access_token', idData);
      this.userId = idData;

      // GET THE USER DETAILS FROM THE DATABASE BY SUBSCRIBING TO THE  SERVICE
      this.authService.getUserById(this.userId).subscribe((res) => {
        this.userDetail = res;
        // this.customerDetails= res.email;
        console.log('the paymentis from: ', this.userDetail);

        (this.customerDetails.name = this.userDetail.msg.firstName),
          (this.customerDetails.email = this.userDetail.msg.email);
      });

      console.log('the customer: ', this.customerDetails);

      // GET THE DETAILS FROM THE DATABASE BY SUBSCRIBING TO THE  SERVICE
      this.CampaignService.getcampaignTypeByName(this.campaignName).subscribe(
        (campaignData) => {
          this.campaignDetail = campaignData;
          console.log(this.campaignDetail);
        }
      );
    });
  }

  // CREATE A CAMPAIGN SUBSCRIPTION FROM THE SUBSCRIBE FORM
  subscribeCampaign() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.subscribeForm.invalid) {
      return;
    }

    // get all the input on the form into the campaign type schema
    const newcampaignType: campaignType = {
      campaignName: this.subscribeForm.get('campaignName').value,
      campaignCoverage: this.subscribeForm.get('campaignCoverage').value,
      campaignPrice: this.subscribeForm.get('campaignPrice').value,
      updatedAt: undefined
    };

    // Call the campaignSubscription defined in the campaign service and subscribe to the observable
    this.CampaignService.createcampaignSubcription(newcampaignType).subscribe(
      (res) => {
        console.log('new campaignSubscription', res);
        // this.router.navigate(['/log-in']);
      }
    );
  }

  //Inject the flutterwave service

  makePayment() {
    this.flutterwave.inlinePay({
      // amount: this.subscribeForm.value.amount,
      amount: this.campaignDetail.campaignPrice,
      public_key: this.publicKey,
      tx_ref: this.generateReference(),
      //amount: this.form.value.amount,
      currency: 'NGN',
      payment_options: 'card,ussd',
      redirect_url: 'http://localhost:8080/transaction/response',
      //meta: this.meta,
      customer: this.customerDetails,
      customizations: this.customizations,
      callback: this.makePaymentCallback,
      onclose: this.closedPaymentModal,
      callbackContext: this,
    });
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }

  generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }
}

function subscribeCampaign(): (error: any) => void {
  throw new Error('Function not implemented.');
}
