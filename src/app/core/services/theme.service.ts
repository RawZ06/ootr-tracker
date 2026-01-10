import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  private themeSubject = new BehaviorSubject<'light' | 'dark'>(this.getInitialTheme());

  theme$ = this.themeSubject.asObservable();

  constructor() {
    // TODO: Story 5.1 - Implement theme initialization
  }

  toggleTheme(): void {
    // TODO: Story 5.1 - Implement theme toggle
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private setTheme(theme: 'light' | 'dark'): void {
    // TODO: Story 5.1 - Implement theme setting
    this.themeSubject.next(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  private getInitialTheme(): 'light' | 'dark' {
    // TODO: Story 5.2 - Implement localStorage persistence
    const stored = localStorage.getItem('theme');
    if (stored) return stored as 'light' | 'dark';
    return this.prefersDark.matches ? 'dark' : 'light';
  }
}
