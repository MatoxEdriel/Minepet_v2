import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../../modules/dashboard/pages/users/interfaces/user.interface';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {


  @Input() user!: IUser;

  get fullName(): string {
    return `${this.user.persons?.name ?? ''} ${this.user.persons?.last_name ?? ''}`;
  }

  get avatarUrl(): string {
    return `https://i.pravatar.cc/150?u=${this.user.id}`;
  }

  constructor() { }

  ngOnInit() {
  }



}
