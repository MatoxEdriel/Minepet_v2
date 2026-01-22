import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../../shared/services/Storage.service';
import { environments } from '../../../../../../environment/environment.dev';
import { Observable } from 'rxjs';
import { IHttpResponse } from '../../../../../interfaces/response.interface';
import { CreateUserDto, UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _http = inject(HttpClient);

  private readonly _resource = 'users';

  private readonly _baseUrl = environments.api.baseUrl;


  private get _endpoint(): string {
    return `${this._baseUrl}/${this._resource}`;
  }
  //todo corregir los servicios y dejarlo en un estandar profesional 

  create(userDto: CreateUserDto): Observable<IHttpResponse<UserResponse>> {
    return this._http.post<IHttpResponse<UserResponse>>(this._endpoint, userDto);
  }


  constructor() { }

}
