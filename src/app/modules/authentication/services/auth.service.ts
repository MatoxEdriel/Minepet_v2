import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environments } from '../../../../environment/environment.dev';
import { loginUser } from '../interfaces/auth.interface';
import { AuthResponse, IHttpResponse, RecoveryResponse, UserInfo } from '../../../interfaces/response.interface';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/services/Storage.service';
import { STORAGE_KEYS } from '../../../core/enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService)



  private readonly baseUrl = environments.api.baseUrl;
  private readonly authPath = environments.auth.loginUrl;

  login(user: loginUser): Observable<IHttpResponse<AuthResponse>> {
    const url = `${this.baseUrl}${this.authPath}`
    return this.http.post<IHttpResponse<AuthResponse>>(url, user).pipe(

      tap(response => {
        if (response.data) {
          this.saveSession(response.data)
        }
      })
    )
  }


  //!Con esto resolvemos el problema seteamos el valor del email ingrsado previamente

  setRecoveryEmail(email: string): void {

    this.storage.setItem(STORAGE_KEYS.OTP_EMAIL, email)



  }

  //!PRUEBA 1 

  verifyCode(code: string) {
    const email = this.storage.getItem<string>(STORAGE_KEYS.OTP_EMAIL);

    const url = `${this.baseUrl}/auth/verify-code`
    return this.http.post<IHttpResponse<RecoveryResponse>>(url, { email, code })
      .pipe(tap(response => {
        if (response.data) {
          const token_recovery = response.data.recoveryToken;
          //aqui seteamos el token para que este el recovery token
          this.storage.setItem(STORAGE_KEYS.RECOVERY_TOKEN, token_recovery)
          this.storage.removeItem(STORAGE_KEYS.OTP_EMAIL)
        }
      }))
  }

  //Cambio de contraseña con reemplazo de token 

  updatePassword(newPassword: string) {
    const url = `${this.baseUrl}/auth/change-password`

    const body = { pass: newPassword };

    return this.http.patch<AuthResponse>(url, body).pipe(
      tap(response => {
        this.saveSession(response)
      })
    )
  }

  resetPasswordwithToken(newPassword: string) {

    const url = `${this.baseUrl}/auth/reset-password`;


    const recoveryToken = this.storage.getItem<string>(STORAGE_KEYS.RECOVERY_TOKEN);

    if (!recoveryToken) {

      throw new Error('no se encontro el token de recuperacion')
    }
    //enotnces aqui tengo un ejemplo de mandar en un header 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${recoveryToken}`
    });
    const body = { newPass: newPassword }
    return this.http.post<IHttpResponse<null>>(url, body, { headers }).pipe(
      tap(() => {
        this.storage.removeItem(STORAGE_KEYS.RECOVERY_TOKEN);
      })
    );
  }


  private saveSession(data: AuthResponse): void {
    this.storage.setItem(STORAGE_KEYS.TOKEN, data.access_token);
    this.storage.setItem(STORAGE_KEYS.FIRST_LOGIN, data.first_login);
    this.storage.setItem(STORAGE_KEYS.USER, data.user)


  }

  get isFirstLogin(): boolean {
    return this.storage.getItem<boolean>(STORAGE_KEYS.FIRST_LOGIN) ?? false;
  }


  logOut() {

    this.storage.clear();

    this.router.navigate(['/auth/sign-in']).then(() => {
      window.location.reload();
    })
  }








  get currentUser() {
    return this.storage.getItem<any>(STORAGE_KEYS.USER);

  }



  //Verificacion de codigo otp. 
  //!debo enviar el codigo otp  




}
