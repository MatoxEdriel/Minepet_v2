import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { loginUser } from '../../interfaces/auth.interface';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { ToastService } from '../../../../shared/services/Toast.service';
import { StorageService } from '../../../../shared/services/Storage.service';
import { STORAGE_KEYS } from '../../../../core/enums/storage-keys.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent implements OnInit {





  form!: FormGroup;
  user_name!: FormControl;
  password!: FormControl;
  showPassword: boolean = false;
  isEntering = true;
  isLeaving = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly storageService: StorageService
  ) {
    this.form = this.fb.group({
      user_name: ['', [Validators.required]],
      password: ['', [Validators.required]]

    });

  }

  ngOnInit() {
    this.user_name = this.form.get('user_name') as FormControl;
    this.password = this.form.get('password') as FormControl;

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginTest() {
    this.router.navigate(['/dashboard'])

  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const claims: loginUser = {
      user_name: this.form.value.user_name,
      pass: this.form.value.password
    }
    this.authService.login(claims).subscribe({

      next: (res) => {

        //recuerdaque el primer parametro va a ser como va ser guardado la data 
        this.storageService.setItem(STORAGE_KEYS.TOKEN, res.data.access_token);


        if (res.data.first_login) {
          this.router.navigate(['/auth/change-password']);
          this.toastService.show('Bienvenido', 'success');
        } else {
          this.router.navigate(['/dashboard']);

        }
      },
      error: (err) => {
        const apiError = err.error;
        let message = apiError?.message || 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';


        if (err.status === 401) {
          message = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
        } else {

          message = apiError?.message || 'Error al conectar con el servidor';

        }

        this.toastService.show(message, 'error');
      }






    })


  }


  onActivate() {
    this.isEntering = true;
    this.isLeaving = false;
  }

  onDeactivate() {
    this.isEntering = false;
    this.isLeaving = true;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }



  goToRecovery() {
    this.router.navigate(['/auth/recovery'], { relativeTo: this.route });
  }




}

