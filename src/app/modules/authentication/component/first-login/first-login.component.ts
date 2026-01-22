import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  standalone: false
})
export class FirstLoginComponent implements OnInit {


  form!: FormGroup;
  password!: FormControl;
  confirmPassword!: FormControl;
  passwordStrength: string = '';
  strengthColor: string = '';
  strengthWidth: string = 'w-0';

  isLoading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  resetPassword() {
    if (this.form.valid) {

      this.isLoading = true;
      this.form.disable();

      const newPass = this.form.get('password')?.value;

      this.authService.updatePassword(newPass).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard'])
        },
        error: (err) => {
          this.isLoading = false;
          this.form.enable();
          alert('xd')
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(value => {
      this.checkStrength(value);
    });
  }


  checkStrength(password: string): void {
    let score = 0;
    if (!password) {
      this.passwordStrength = '';
      this.strengthColor = '';
      return;
    }

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
      case 2:
        this.passwordStrength = 'Débil';
        this.strengthColor = 'bg-red-500';
        this.strengthWidth = 'w-1/3';
        break;
      case 3:
        this.passwordStrength = 'Media';
        this.strengthColor = 'bg-yellow-500';
        this.strengthWidth = 'w-2/3';
        break;
      case 4:
        this.passwordStrength = 'Fuerte';
        this.strengthColor = 'bg-green-500';
        this.strengthWidth = 'w-full';
        break;
    }
  }
}
