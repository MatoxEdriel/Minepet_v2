import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from '../../services/Network.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ConnectionStatusComponent',
  templateUrl: './ConnectionStatusComponent.component.html',
  styleUrls: ['./ConnectionStatusComponent.component.css'],
  imports: [CommonModule]
})
export class ConnectionStatusComponentComponent implements OnInit {

  isOnline$: Observable<boolean>;

  constructor(private networkService: NetworkService) {
    this.isOnline$ = this.networkService.isOnline$;
  }

  ngOnInit() {
  }

}
