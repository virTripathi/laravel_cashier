import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './components/layouts/user-layout/user-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { RedirectIfAlreadyLoggedinGuardService } from './services/redirect-if-already-authenticated.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {path:'', component: UserLayoutComponent, children: [
    {path:'',component: HomeComponent},
    {path:'auth', canActivate:[RedirectIfAlreadyLoggedinGuardService],children: [
      {path: 'login', component: LoginComponent, },
      {path: 'register', component: RegisterComponent,},
      {path:'forgot-password', component: ForgotPasswordComponent},
    ]},
    {path:'auth/logout', component: LogoutComponent, canActivate:[AuthGuardService]},
    {path:'dashboard',component: DashboardComponent, canActivate:[AuthGuardService]},
    {path:'my-profile/:id',component: MyProfileComponent, canActivate:[AuthGuardService]}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
