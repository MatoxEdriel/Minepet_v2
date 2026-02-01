import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../../modules/dashboard/pages/users/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.css'],
  imports: [CommonModule]
})
export class DataDetailComponent implements OnInit {


  @Input() user: IUser | null = null




  constructor() { }

  ngOnInit() {
  }

  getInitials(): string {
    if (!this.user?.name) return '??';

    const firstLetter = this.user.name.charAt(0);
    const secondLetter = this.user.last_name ? this.user.last_name.charAt(0) : '';

    return (firstLetter + secondLetter).toUpperCase();
  }

}
