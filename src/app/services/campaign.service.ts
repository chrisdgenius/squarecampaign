import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { campaignType } from '../model/campaign-type';
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaignTypeUrl = 'http://localhost:8080/campaignType';
 // private campaignTypeUrl = 'https://apicampaign.herokuapp.com/campaignType';
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router
    ) {}

  createcampaignType(payload: campaignType): Observable<campaignType> {
    return this.http.post<campaignType>(`${this.campaignTypeUrl}/register`, payload);
  }
  
  createcampaignSubcription(payload: campaignType): Observable<campaignType> {
    return this.http.post<campaignType>(`${this.campaignTypeUrl}/subscription`, payload);
  }
// GET ALL THE CAMPAIGN TYPES
  getcampaignType(): Observable<campaignType> {
    return this.http.get<campaignType>(`${this.campaignTypeUrl}/ALL`);
  }
  
//GET AA PARTICULAR CAMPAIGN TYPE BY NAME
  getcampaignTypeByName(campaignName): Observable<campaignType> {
   return this.http.get<campaignType>(`${this.campaignTypeUrl}/campaignName/${campaignName}`);

   // return this.http.get<campaignType>(`${this.campaignTypeUrl}/${campaign.campaignName}`);
  }

  updatecampaignType(_id: any, campaign: campaignType): Observable<campaignType> {
    return this.http
      .patch<campaignType>(`${this.campaignTypeUrl}/${campaign.campaignName}`, campaign)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  deletecampaignType(_id: string): Observable<campaignType> {
    return this.http.delete<campaignType>(`${this.campaignTypeUrl}/${_id}`);
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

  readonly url = 'http://localhost:8080/post';
  
  createPost(name: string,price:string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('price', price);
  //  return this.http.post(this.url,formData);
    return this.http.post(`${this.url}/create`,formData);
  }

// GET ALL THE CAMPAIGN POST
getPost(): Observable<any> {
  return this.http.get<any>(`${this.url}/All`);
}
  
// GET SINGLE THE CAMPAIGN POST


getOne(_id): Observable<any> {
  return this.http.get<any>(`${this.url}/single/${_id}`);

  // return this.http.get<campaignType>(`${this.campaignTypeUrl}/${campaign.campaignName}`);
 }
}








