import { Injectable } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';
import { ToastMessage } from '../../interfaces/toast.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  toastState$ = this.toastSubject.asObservable();

  show(text: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    this.toastSubject.next({
      text,
      type,
      id: Date.now(),
      progress: 100,
      duration
    } as any);
  }

}
