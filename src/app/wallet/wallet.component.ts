import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';

import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

import {
  Flutterwave,
  InlinePaymentOptions,
  PaymentSuccessResponse,
} from 'flutterwave-angular-v3';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  userDetail = <any>{};
  customerDetails= <any>{};
  form: FormGroup; //declare a reactive form of type FormGroup
  transactionDetail = <any>{};
  walletDetail: any;
  userId: string = '';
  userId2: string = '';
  name: string = '';
 firstName: string = '';

  publicKey = 'FLWPUBK_TEST-05fb0f05a47123563819869d99d20de6-X';
  

  

  customizations = {
    title: 'Customization Title',
    description: 'Customization Description',
    logo: 'https://flutterwave.com/images/logo-colored.svg',
  };
  userDetail2: any;

  //meta = { counsumer_id: '7898', consumer_mac: 'kjs9s8ss7dd' };

 

  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    private walletService: WalletService,
    public router: Router,
    private flutterwave: Flutterwave,
    private activatedRouted: ActivatedRoute
  ) {
    this.form=this.fb.group({
      amount:['']
    })
   }

  ngOnInit(): void {

    //localStorage.setItem('key_id', JSON.stringify(data.id) )
    let idData = this.authService.getToken()
      console.log('access_token', idData)
      this.userId = idData;
      // old
    this.activatedRouted.params.subscribe((data) => {
      this.userId2 = data.id;
      console.log(this.userId);
    });

       // GET THE DETAILS FROM THE DATABASE BY SUBSCRIBING TO THE  SERVICE
      
       this.authService.getUserById(this.userId).subscribe((res) => {
         this.userDetail = res;
        // this.customerDetails= res.email;
         console.log('the paymentis from: ',this.userDetail);
         

         this. customerDetails.name=this.userDetail.msg.firstName,
         this. customerDetails.email= this.userDetail.msg.email
        })
      
        
          console.log('the customer: ',this.customerDetails);  
        //  phone_number: this.form.amount.value,
        
 
    //initialise the variables in the reactive form.
    // the form will have name and image as FormControl
   this.form = new FormGroup({
    //   name: new FormControl(''),
      amount: new FormControl('')
   //    email: new FormControl(''),
    });
  }


 


  //Inject the flutterwave service

  makePayment() {
    this.flutterwave.inlinePay({
    amount: this.form.value.amount,
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
    
  })

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

  walletbalance() {
    //Note: The userId was added to the router url as id from the routerlink in the html ofthe parent component

    this.activatedRouted.params.subscribe((data) => {
      this.userId = data.id;
      console.log(this.userId);
      this.walletService.walletBalance(this.userId).subscribe((walletData) => {
        this.walletDetail = walletData;
        console.log(this.walletDetail);
      });
    });
  }
}
  function ngAfterViewInit(): (error: any) => void {
    throw new Error('Function not implemented.');
  }

