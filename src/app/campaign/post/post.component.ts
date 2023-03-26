import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
//for textarea auto sizing
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  form: FormGroup; //declare a reactive form of type FormGroup
  imageData: string; // declare the image data of type string

  fileName: string; // variable to name the file
 

  constructor(
    private campaignService: CampaignService,
    private _ngZone: NgZone,
    public router: Router,
    public dialogRef: MatDialog
  ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    //initialise the variables in the reactive form.
    // the form will have name and image as FormControl
    this.form = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(null),
    });
  }

  // when an input type file is selected, this function is called
  onFileSelect(event: Event) {
    //const file = (event.target as HTMLInputElement).files[0];

    //choose the first image if multiple images are selected
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    // TO GET THE FILE NAME
    this.fileName = target.files[0].name;

    //const file: File = (target.files as FileList)[0];
    //set the file as image on the form
    this.form.patchValue({ image: file });
    //define the image format
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    // Read the selected image data
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.value.name === '') {
      this.form.value.name = this.fileName;
    }

    // this.profileService.uploadImage(this.form.value.name, this.form.value.image);
    this.campaignService
      .createPost(
        this.form.value.name,
        this.form.value.price,
        this.form.value.image
      )
      .subscribe((res) => {
       
        console.log('new image', res);

        
        
     

      });
    this.form.reset();
    this.imageData = null;
    this.reloadPage();
    this.closeDialog();
    this.router.navigate(['/campaign/viewposts']);


    
     


  }
  closeDialog(){
    this.dialogRef.closeAll();
  }
  reloadPage() {
    window.location.reload();
 }
}
