import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { User } from '../model/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // endpoint: string = 'http://localhost:4000/api';
  endpoint: string = 'https://apicampaign.herokuapp.com/api';

  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};


  private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
  }



 // Sign-up
 signUp(user: User): Observable<any> {
  let api = `${this.endpoint}/signup`;
  return this.http.post(api, user)
    .pipe(
      catchError(this.handleError)
    )
}

  

  logIn(userName, password) {
    return this.http.post<User>(`${this.endpoint}/login`, { userName, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
            
        }));
}

//to subscribe to login
get isLoggedIn(): boolean {
  let authToken = localStorage.getItem('user');
  return (authToken !== null) ? true : false;
}

 // User profile
 getUserProfile(_id): Observable<any> {
  let api = `${this.endpoint}/userNameprofile/${_id}`;
  return this.http.get(api, { headers: this.headers }).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.handleError)
  )
}

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }






  

}
