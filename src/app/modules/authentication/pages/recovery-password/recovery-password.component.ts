import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailService } from '../../../../shared/services/email.service';
import { ToastService } from '../../../../shared/services/Toast.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  standalone: false,
})
export class RecoveryPasswordComponent implements OnInit {
  form!: FormGroup;

  email!: FormControl;






  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly emailService: EmailService,
    private readonly toastService: ToastService,
    private readonly authService: AuthService

  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]

    });



  }



  ngOnInit() {

    this.email = this.form.get('email') as FormControl;
  }

  sendRecoveryEmail() {
    if (this.form.valid) {

      const email = this.form.value.email;

      this.emailService.sendEmail(email).subscribe({
        next: (res) => {
          this.toastService.show(res.message, 'success');
          this.authService.setRecoveryEmail(email);
          this.router.navigate(['/auth/verify']);
        },
        error: (err) => {
          const errorMsg = err.error?.message || 'Error al enviar el correo';
          this.toastService.show(errorMsg, 'error');
        }
      })


    } else {

      this.form.markAllAsTouched();
    }
  }


  goBack() {
    this.router.navigate(['/auth/sign-in'], { relativeTo: this.route });
  }

  get emailInvalid(): boolean {
    return this.email.invalid && (this.email.dirty || this.email.touched);
  }

  get emailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'El correo electrónico es requerido';
    }
    if (this.email.hasError('email')) {
      return 'Ingresa un correo electrónico válido';
    }
    return '';
  }
}

