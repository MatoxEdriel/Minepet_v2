import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = signal<boolean>(false);

  show() {
    Promise.resolve().then(() => this.isLoading.set(true));
  }

  hide() {
    Promise.resolve().then(() => this.isLoading.set(false));
  }
}
