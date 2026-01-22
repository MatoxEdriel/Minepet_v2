import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environment/environment.dev';
import { MenuSection } from '../../interfaces/menu.interface';
import { map, Observable } from 'rxjs';
import { IHttpResponse } from '../../interfaces/response.interface';
import { StorageService } from './Storage.service';
import { STORAGE_KEYS } from '../../core/enums/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  private readonly baseUrl = environments.api.baseUrl;
  private readonly menuPath = '/menu';

  getMenu(): Observable<MenuSection[]> {

    const url = `${this.baseUrl}${this.menuPath}`;

    const token = this.storage.getItem<string>(STORAGE_KEYS.TOKEN);


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<IHttpResponse<MenuSection[]>>(url, { headers }).pipe(
      map(response => response.data)

    );
  }
}
