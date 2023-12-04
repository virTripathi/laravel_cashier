import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/env';
import { APIResponses } from '../models/APIResponses';
import { SubscriptionCard } from '../models/SubscriptionCard';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private url = environment.backendBaseUrl+'/plans';

  httpOptions:{ headers: HttpHeaders} = {
    headers: new HttpHeaders({
      "Content-Type":"application/json",
      "Cache-Control":"no-cache",
      "Accept":"application/json",
    })
  }
  constructor(
    private http: HttpClient,
  ) { }

  getPlans():Observable<APIResponses<SubscriptionCard[]>> {
   return this.http.get<APIResponses<SubscriptionCard[]>>(this.url,this.httpOptions);
  }


}
