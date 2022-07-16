import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { campaignType } from 'src/app/model/campaign-type';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  campaignName: string = '';

  campaignDetail: campaignType = {
    campaignName: '',
    campaignCoverage: '',
    campaignPrice: 0,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private CampaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.CampaignService.getcampaignType().subscribe((res) => {
      this.campaignDetail = res;
      console.log('Available Campaigns are', this.campaignDetail);
    });
  }
}
