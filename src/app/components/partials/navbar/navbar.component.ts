import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable  } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  $isAuthenticated!: Observable<boolean>;
  user!:  User;
  constructor(
    private auth: AuthService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.$isAuthenticated = this.auth.isAuthenticated$;
    console.log(this.$isAuthenticated);
    
    this.auth.loggedInUser$.subscribe((user)=> {
      if(typeof(user) !== 'boolean') {
        this.user = user;
      }
    });
  }

  viewProfile() {
    this.user = this.auth.user();
    this.router.navigate(['/my-profile/'+this.user.id]);
  }


}
