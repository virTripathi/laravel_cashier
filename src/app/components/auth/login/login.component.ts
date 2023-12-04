import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MyToastrService } from 'src/app/services/toastr.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  serverErrors!: any;

  constructor(
    private fb: FormBuilder,
    private toastr: MyToastrService,
    private auth: AuthService,
    private route: Router
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]],
    });
   }

   get formControls() {
    return this.loginForm.controls;
  }


   login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (response)=> {
          this.route.navigate(['dashboard']);
        },
        (error)=> {
          this.serverErrors = error;
        }
      );
      
    } else {
      this.loginForm.markAllAsTouched();
      this.toastr.showError('Please Complete The Form Before Submitting','Error');
      }
   }

}
