import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { LoaderService } from '../../services/Loader.service';

@Component({
  selector: 'app-Loader',
  templateUrl: './Loader.component.html',
  standalone: true,
  imports: [CommonModule, LottieComponent],
})
export class LoaderComponent implements OnInit {
  loaderService = inject(LoaderService);
  constructor() { }

  ngOnInit() {
  }


  options: AnimationOptions = {
    path: '/loading.json',
    loop: true,
    autoplay: true
  };

}
