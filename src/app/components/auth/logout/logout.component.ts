import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private auth: AuthService
  ) {   }

  ngOnInit() {
    this.logout();
  }

  logout(): void {
    this.auth.logout(true).subscribe(()=> {
      window.location.reload();
    });
  }
}
