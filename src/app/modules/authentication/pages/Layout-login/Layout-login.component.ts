import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../../component/login/login.component';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-Layout-login',
  templateUrl: './Layout-login.component.html',
  standalone: false,
})
export class LayoutLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
