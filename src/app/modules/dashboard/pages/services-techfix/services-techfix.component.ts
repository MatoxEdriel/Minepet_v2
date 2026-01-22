import { Component, inject, OnInit } from '@angular/core';
import { user } from '../../../authentication/interfaces/auth.interface';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-services-techfix',
  templateUrl: './services-techfix.component.html',
  styleUrls: ['./services-techfix.component.css'],
  standalone: false
})
export class ServicesTechfixComponent implements OnInit {

  private authService = inject(AuthService);

  userName: string = ''


  constructor() { }

  ngOnInit() {

    const user = this.authService.currentUser;

    if (user) {
      this.userName = user.fullName;
    }

  }

}
