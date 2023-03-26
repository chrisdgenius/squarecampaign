import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { User } from '../model/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import{Subject} from'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:8080/api';
 // endpoint: string = 'https://apicampaign.herokuapp.com/api';

  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  addLogs:Subject<any>;
  logs: any;

  private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();


        this.addLogs=new Subject<any>();
    this.logs=new Array<any>();
  }



 // Sign-up
 signUp(user: User): Observable<any> {
  let api = `${this.endpoint}/signup`;
  return this.http.post(api, user)
    .pipe(
      catchError(this.handleError)
    )
}

  
 _id:string;

 // Sign-in
 signIn(userName, password) {
  let getUser;
  return this.http.post<any>(`${this.endpoint}/login`, { userName, password })
    .subscribe((res: any) => {
      getUser = res;
      console.log('the id to be shared:',getUser.message._id);

      this.addLogs.next(getUser.message._id);
     
      localStorage.setItem('access_token', res.token)
      localStorage.setItem('access_id', getUser.message._id)
      let data = localStorage.getItem('access_id')
        console.log('access_token', data)
     
        this.router.navigate(['campaign/viewposts/' + data]);

       // this.router.navigate(['campaign/viewposts/' + getUser.message._id]);
        //this.router.navigate(['user-profile/' + getUser.message._id]);
        
    
    })
}



  logIn(userName, password) {
    return this.http.post<User>(`${this.endpoint}/login`, { userName, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('access_token', JSON.stringify(user));
            this.userSubject.next(user);
            return user;          
        }));
}


//to subscribe to login
getToken() {
  return localStorage.getItem('access_id');
}

get isLoggedIn(): boolean {
  let authToken = localStorage.getItem('access_token');
  this.getToken();
  return (authToken !== null) ? true : false;
}

doLogout() {
  let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
    localStorage.removeItem('access_id');
    this.router.navigate(['log-in']);
  }
}





//get the user info
getUserById(_id): Observable<User> {
  return this.http.get<User>(`${this.endpoint}/user-profile/${_id}`);

  // return this.http.get<campaignType>(`${this.campaignTypeUrl}/${campaign.campaignName}`);
 }
 // User profile
 getUserProfile(id): Observable<any> {
  let api = `${this.endpoint}/user-profile/${id}`;
  return this.http.get(api, { headers: this.headers }).pipe(
    map((res: Response) => {
      console.log(res);
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
