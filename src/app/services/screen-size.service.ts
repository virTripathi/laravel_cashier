import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    this.screenWidth$.next(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth$.next(event.target.innerWidth);
  }

  getScreenWidth(): BehaviorSubject<number> {
    return this.screenWidth$;
  }
}
