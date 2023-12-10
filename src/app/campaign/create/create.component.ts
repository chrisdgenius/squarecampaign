import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { campaignType } from 'src/app/model/campaign-type';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createForm: UntypedFormGroup;
  submitted = false;

  constructor(
    public fb: UntypedFormBuilder,
    private CampaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit(){
    this.createForm = this.fb.group({
      campaignName: ['', Validators.required],
      campaignCoverage: ['', Validators.required],
      campaignPrice: [, Validators.required],
    })
  }

  get f() {
    return this.createForm.controls;
  }

  
  createCampaign() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }

    const newcampaignType: campaignType = {
      campaignName: this.createForm.get('campaignName').value,
      campaignCoverage: this.createForm.get('campaignCoverage').value,
      campaignPrice: this.createForm.get('campaignPrice').value,
      updatedAt: undefined
    };
    this.CampaignService.createcampaignType(newcampaignType).subscribe(
      (res) => {
        console.log('new newcampaignType', res);
        // this.router.navigate(['/log-in']);
      }
    );
  }
}
