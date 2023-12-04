import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLayoutComponent } from './components/layouts/user-layout/user-layout.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { SubscriptionPlanCardComponent } from './components/partials/subscription-plan-card/subscription-plan-card.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoaderComponent } from './components/partials/loader/loader.component';
import { HomeComponent } from './components/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    LogoutComponent,
    SubscriptionPlanCardComponent,
    MyProfileComponent,
    LoaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
