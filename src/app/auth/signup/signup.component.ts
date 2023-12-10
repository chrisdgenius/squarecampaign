import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'src/app/model/user';
//import { User } from 'src/app/model/user.model';
import { MustMatch } from 'src/app/model/control.helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signupForm: UntypedFormGroup;
  submitted = false;
 
 
//roles = ['Super Admin', 'Property Manager', 'Tenant', 'User'];
  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    public authService: AuthService
  ) 
  { }

 ngOnInit() {

  this.signupForm = this.fb.group({
   firstName: ['', Validators.required],
   lastName: ['', Validators.required],
   email: ['', [Validators.required, Validators.email]],
   userName:['', Validators.required],
   password: ['', [Validators.required, Validators.minLength(6)]],
   confirmPassword:['', Validators.required],
   
  }),
  {
    Validator: MustMatch('password','comfirmPassword')
 }

  
  }
  get f() {
    return this.signupForm.controls;
  }
  signUp() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    const newUser: User = {
      _id: '',
      firstName: this.signupForm.get('firstName').value,
      lastName: this.signupForm.get('lastName').value,
      email: this.signupForm.get('email').value,
      userName: this.signupForm.get('userName').value,
      password: this.signupForm.get('password').value,
      confirmPassword: this.signupForm.get('confirmPassword').value,
  
    }; 
    this.authService.signUp(newUser).subscribe((res) => {
       console.log('new signup', res)
      this.router.navigate(['/log-in']);
    });
   
  }
  onReset() {
    
    this.signupForm.reset();
    this.router.navigate(['/log-in']);
  }
}

  