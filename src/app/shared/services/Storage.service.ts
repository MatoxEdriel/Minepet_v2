import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  /*
    Justificacion decidi crear este servicio para manejar los datos de cache en el contexto
    necesito guardar el correo porque pertenece en otro componente entonces para pasarle el codigo OTP con el 
    email, decidi por ahora que es la mejor practica, una idea era pasarle en el ngOnit un metodo que me traiga dicho valor
  
  
  
    */



  //!Crearemos una variable 
  constructor() { }


  /*
  ? Primero haremos un convert para los datos que convierta a texto automaticamente 
  ? Razon: El almcenamiento de los navegadores solo entiende texto es el famoso error llamado [Object Object]
  ? en si se usa el emtodo stringify que lo transforma en una cadena de texto 
  ! ejemplo  const text = JSON.stringify(usuario)     {infor,: finro , info etc }
  */

  setItem(key: string, value: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error guardando en sessionStorage', e);
    }
  }

  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);

    if (!item) {
      return null;
    }
    try {
      return JSON.parse(item) as T;
    } catch (e) {
      console.error('Error parseando JSON del storage', e);
      return null;
    }
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}







