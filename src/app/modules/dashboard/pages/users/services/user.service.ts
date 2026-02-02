import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../../shared/services/Storage.service';
import { environments } from '../../../../../../environment/environment.dev';
import { Observable } from 'rxjs';
import { IHttpResponse } from '../../../../../interfaces/response.interface';
import { CreateUserDto, IUser, PaginatedResponse, UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _http = inject(HttpClient);

  private readonly _resource = 'users';

  private readonly _baseUrl = environments.api.baseUrl;
  //http://localhost:3000/api/users?page=1&limit=5

  private get _endpoint(): string {
    return `${this._baseUrl}/${this._resource}`;
  }
  //todo corregir los servicios y dejarlo en un estandar profesional 

  create(userDto: CreateUserDto): Observable<IHttpResponse<UserResponse>> {
    return this._http.post<IHttpResponse<UserResponse>>(this._endpoint, userDto);
  }


  getById(id: number): Observable<IHttpResponse<IUser>> {
    return this._http.get<IHttpResponse<IUser>>(`${this._endpoint}/${id}`, {
      headers: {
        'X-Skip-Loader': 'true'
      }
    });
  }



  //
  getAll(
    page: number,
    limit: number,
    search?: string
  ): Observable<IHttpResponse<PaginatedResponse<IUser>>> {

    const params: any = { page, limit };
    if (search) params.search = search;


    return this._http.get<IHttpResponse<PaginatedResponse<IUser>>>(
      this._endpoint,
      {
        params
      }
    );
  }



  constructor() { }

}
