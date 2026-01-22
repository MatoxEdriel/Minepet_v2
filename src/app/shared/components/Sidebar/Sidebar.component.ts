import { Component, inject, Input, OnInit } from '@angular/core';
import { MenuSection } from '../../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {




  @Input() isOpen = true;


  @Input() menuItems: MenuSection[] = []

  expandedMenu: string | null = null;

  constructor() { }
  ngOnInit() {



  }


  toggleSubmenu(label: string) {
    if (this.expandedMenu === label) {
      this.expandedMenu = null;
    } else {
      this.expandedMenu = label;
    }
  }
}
