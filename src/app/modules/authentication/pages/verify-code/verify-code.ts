import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../../shared/services/Toast.service';
import { StorageService } from '../../../../shared/services/Storage.service';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.html',
  standalone: false
})
export class VerifyCodeComponent {


  //Solo es un valor en este caso email

  otpCode: string = '';

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly storageService: StorageService

  ) { }






  //todo usar el debounce de angular

  onOtpChange(code: string) {
    this.otpCode = code

  }



  verifyCode() {

    if (this.otpCode.length < 4) {
      this.toastService.show('El codigo debe ser de 4 digitos', 'error')
      return;

    }

    this.authService.verifyCode(this.otpCode).subscribe({
      next: (res) => {
        this.toastService.show(res.message, 'success')
        this.router.navigate(['/auth/reset-password']);
      },
      error: (err) => {
        this.toastService.show(err.message, 'error')
      }
    })
  }




}
