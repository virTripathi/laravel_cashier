import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { User } from 'src/app/models/User';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{

  user!: User|null;
  screenWidth: number = 0;
  sidebar_configuration: {
    opened: boolean,
    mode: MatDrawerMode,
    hasBackdrop: boolean
  } = {
    'opened': false,
    'mode': 'over' as MatDrawerMode,
    'hasBackdrop': false
  }
  constructor(
    private auth: AuthService,
    private screenSizeService: ScreenSizeService
  ) {  }

  ngOnInit(): void {
      this.user = this.auth.user();
      this.getScreenSize();
  }

  getScreenSize() {
    this.screenSizeService.getScreenWidth().subscribe((width) => {
      this.screenWidth = width;
      if(this.screenWidth <= 768) {
        this.sidebar_configuration['opened'] = false;
        this.sidebar_configuration['mode'] = 'over';
        this.sidebar_configuration['hasBackdrop'] = true;
      } else {
        this.sidebar_configuration['opened'] = true;
        this.sidebar_configuration['mode'] = 'side';
        this.sidebar_configuration['hasBackdrop'] = false;
      }
      console.log('Screen width:', this.screenWidth);
    });
  }
}
