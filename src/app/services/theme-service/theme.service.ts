import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode$ = new BehaviorSubject<boolean>(false);

  isDark$ = this.darkMode$.asObservable();

  initTheme() {
    const saved = localStorage.getItem('theme') === 'dark';
    this.darkMode$.next(saved);
  }

  toggle() {
    const value = !this.darkMode$.value;
    this.darkMode$.next(value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
  }
}
