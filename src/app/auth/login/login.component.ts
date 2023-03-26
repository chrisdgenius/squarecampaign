import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { first } from 'rxjs/operators';

import { User } from 'src/app/model/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup

  userDetail: User = {
    _id: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    userName: '',
    email: '',
  };
  

  

  constructor(
    public fb: FormBuilder,
    public authService:AuthService,
    public router: Router
  
        
  ) {
    this.loginForm=this.fb.group({
      userName:[''],
      password:['']
    })
   }

  ngOnInit(): void {
  }
   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }
  loginUser(){
  //  this.authService.logIn(this.loginForm.value)
    this.authService.logIn(this.f.userName.value, this.f.password.value)
            .pipe(first())
            .subscribe({

              
              next: (res) => {
                this.userDetail = res;
                const myId=this.userDetail._id
                console.log('the user details are obviously', myId);
                console.log('the user details are obviously', this.userDetail);
                this.router.navigate(['campaign/viewposts']);
                // this.router.navigate(['/campaign/viewposts/'+ this.userDetail.email ]);
                // this.router.navigate(['user-profile/' + res.msg._id]);
             //   this.authService.addLogs.next(this.userDetail);
                
              }
  });
}




loginUser1(){
  this.authService.signIn(this.f.userName.value, this.f.password.value)
  
  


  
}
}
