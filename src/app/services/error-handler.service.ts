import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MyToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private toastr: MyToastrService
  ) {}

  showError(msg:string) {
    // this.toastr.error(msg, 'Error!');
  }

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = this.getServerErrorDetails(error);
    }

    console.error(errorMessage);
    this.showError(errorMessage);
    return throwError(errorMessage);
  }

  handleRegistrationError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 422) {
      return throwError(error.error.errors);
    } else if (error.status === 500) {
      this.toastr.showError(error.message,'Error');
      return throwError('Error');
    } else {
      // Handle other types of errors or rethrow for a generic error handler
      return throwError('An unexpected error occurred.');
    }
  }

  private getServerErrorDetails(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Bad Request: The server did not understand the request.';
      case 401:
        return 'Unauthorized: User is not authenticated.';
      case 403:
        return 'Forbidden: User does not have permission to access the resource.';
      case 404:
        return 'Not Found: The requested resource was not found.';
      case 422:
        return 'Unprocessable Content: Please verify your inputs.';
      // Add more cases as needed
      default:
        return `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  }
}
