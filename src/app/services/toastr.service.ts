import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MyToastrService {

  constructor(
    private toastr: ToastrService
  ) { }

  showSuccess(msg:string,title:string,options={}) {
    this.toastr.success(msg, title, options);
  }

  showError(msg:string,title:string,options={}) {
    this.toastr.error(msg, title, options);
  }
}
