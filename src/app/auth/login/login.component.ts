import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
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
              next: () => {
                  this.router.navigate(['/campaign']);
              }
  });
}
}
