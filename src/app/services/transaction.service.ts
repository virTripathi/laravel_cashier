import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url = environment.backendBaseUrl+'/';

  httpOptions:{ headers: HttpHeaders} = {
    headers: new HttpHeaders({
      "Content-Type":"application/json",
      "Cache-Control":"no-cache",
      "Accept":"application/json",
    })
  }

  constructor(
    private http: HttpClient,
    // private router: Router,
    private errorHandlerService: ErrorHandlerService,
    // private location: Location
    ) { }

  initiateTransaction(id:number) {
    return this.http.get(this.url+'initiate-transaction/'+id, this.httpOptions);
  }
}
