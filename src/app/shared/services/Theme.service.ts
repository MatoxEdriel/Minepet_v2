import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  darkMode = signal<boolean>(false)

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.darkMode.set(savedTheme === 'dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode.set(systemDark);
    }

    //todo repasar concepto de signal  effect.   REPASAR 
    effect(() => {
      if (this.darkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }



  toggleTheme() {
    this.darkMode.update(dark => !dark)


  }

}
