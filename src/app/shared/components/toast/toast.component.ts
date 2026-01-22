import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastMessage } from '../../../interfaces/toast.interface';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/Toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true,
  imports: [CommonModule],

})
export class ToastComponent implements OnInit, OnDestroy {

  messages: ToastMessage[] = []
  private subscription!: Subscription;
  private idCounter = 0;





  constructor(private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  dismiss(id: number) {
    this.messages = this.messages.filter(msg => msg.id !== id);
    this.cdr.detectChanges();
  }



  ngOnInit() {

    this.subscription = this.toastService.toastState$.subscribe((msg) => {
      this.add(msg);
      this.cdr.detectChanges();

    });
  }
  private add(msg: any) {
    msg.progress = 100;
    this.messages.push(msg);

    setTimeout(() => {
      msg.progress = 0;

    }, 100);

    setTimeout(() => {
      this.dismiss(msg.id);
    }, msg.duration || 3000);
  }


}
