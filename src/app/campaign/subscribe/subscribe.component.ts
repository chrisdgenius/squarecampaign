import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { campaignType } from 'src/app/model/campaign-type';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent implements OnInit {
  subscribeForm: FormGroup;
  submitted = false;

  campaignName: string = '';
  campaignDetail: any;

  constructor(
    private activatedRouted: ActivatedRoute,
    private CampaignService: CampaignService
  ) {}
  //Note: The campaignName was added to the router url as id
  ngOnInit() {
    this.activatedRouted.params.subscribe((data) => {
      this.campaignName = data.id;
      console.log(this.campaignName);
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
    };

    // Call the campaignSubscription defined in the campaign service and subscribe to the observable
    this.CampaignService.createcampaignSubcription(newcampaignType).subscribe(
      (res) => {
        console.log('new campaignSubscription', res);
        // this.router.navigate(['/log-in']);
      }
    );
  }
}

function subscribeCampaign(): (error: any) => void {
  throw new Error('Function not implemented.');
}
