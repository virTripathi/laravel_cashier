import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MyToastrService } from 'src/app/services/toastr.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  @ViewChild('profile', { static: false }) profile!: ElementRef;
  @ViewChild('profilePlaceholder', { static: false }) profilePlaceholder!: ElementRef;
  registrationForm!:  FormGroup;
  serverErrors: any;
  private profilePhoto!: File;

  constructor( 
    private fb: FormBuilder,
    private toastr: MyToastrService,
    private auth: AuthService,
    private route: Router
  ) {  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      occupation:['',[Validators.minLength(3)]],
      city:['',[Validators.minLength(3)]],
      state:['',[Validators.minLength(3)]],
      country:['',[Validators.minLength(3)]],
      gender:['',[Validators.min(1),Validators.max(4)]],
      password:['',[Validators.required, Validators.minLength(8)]],
      password_confirmation:['',[Validators.required, Validators.minLength(8)]],
      profile_photo: [''],
    }, {
      validators: this.passwordMatchValidator
    });
  }

   get formControls() {
    return this.registrationForm.controls;
  }

  get passwordControl(): AbstractControl {
    return this.registrationForm.get('password') as AbstractControl;
  }

  get confirmPasswordControl(): AbstractControl {
    return this.registrationForm.get('password_confirmation') as AbstractControl;
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }

    return null;  // Validation passed
  }

  openFileDrawer() {
    console.log('click');
    this.profile.nativeElement.click();
  }

  updatePlaceHolder(event:any) {
    const file: File = event.target.files[0];
    if (file) {      
      this.profilePhoto = file;
      this.profilePlaceholder.nativeElement.value = file.name;
    }
  }

  register() {
    if (this.registrationForm.valid) {
      var fileFormData = new FormData();
      if(this.profilePhoto) {
        fileFormData.append('profile_photo', this.profilePhoto);
      }
      const registrationFormValue = this.registrationForm.value;
      Object.keys(registrationFormValue).forEach(key => {
        fileFormData.append(key, registrationFormValue[key]);
      });
      this.auth.register(fileFormData).subscribe(
        (response)=> {
          this.route.navigate(['/login']);
        },
        (error)=> {
          this.serverErrors = error;
        }
      );
      
    } else {
      this.registrationForm.markAllAsTouched();
      this.toastr.showError('Please Complete The Form Before Submitting','Error');
      }
  }

}
