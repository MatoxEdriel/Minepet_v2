import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../modules/authentication/services/auth.service';
import { user } from '../../../modules/authentication/interfaces/auth.interface';
import { ThemeService } from '../../services/Theme.service';

@Component({
  selector: 'app-Topbar',
  templateUrl: './Topbar.component.html',
  imports: [CommonModule],
  standalone: true
})
export class TopbarComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();


  isProfileMenuOpen = false;
  //Todo poner un interface para el user en general 
  currentUser: user | null = null;
  userInitials: string = '';
  displayRole: string = '';
  public themeService = inject(ThemeService);


  //Test de cambio por rendimiento 
  switchTheme(event: MouseEvent) {

    const x = event.clientX;
    const y = event.clientY;

    const root = document.documentElement;
    root.style.setProperty('--x', x + 'px');
    root.style.setProperty('--y', y + 'px');

    if (!document.startViewTransition) {
      this.themeService.toggleTheme();
      return;
    }

    document.startViewTransition(() => {
      this.themeService.toggleTheme();
    });
  }
  constructor(private readonly authService: AuthService) { }

  ngOnInit() {


    this.currentUser = this.authService.currentUser;

    if (this.currentUser) {
      this.generateInitials();

      if (this.currentUser.roles && this.currentUser.roles.length > 0) {
        this.displayRole = this.currentUser.roles[0];
      } else {
        this.displayRole = 'Usuario';
      }
    }

  }


  generateInitials() {
    const name = this.currentUser?.fullName || '';

    if (!name) {
      this.userInitials = 'EC';
      return;
    }

    const parts = name.split(' ');

    if (parts.length >= 2) {

      this.userInitials = (parts[0][0] + parts[1][0]).toUpperCase();
    }
    else {

      this.userInitials = name.substring(0, 2).toUpperCase();
    }



  }



  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {

    this.authService.logOut()
  }

}
