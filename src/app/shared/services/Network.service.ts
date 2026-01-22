import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {



  //BehaviorSubject 
  //!para el que se suscriba reciba el ultimo valor es decir si tiene conexion xd


  private onlineStatus$ = new BehaviorSubject<boolean>(navigator.onLine)




  //todo repasar. el ngZone
  //es un detector de cambios funciona a nivel general de la aplicacion ante cualquier evento
  /*
Zona de vigilancia en si 
el problema es que necesitamos un evento especifico en este caso
la ausencia del internet de por si 



  */
  constructor(
    private ngZone: NgZone


  ) {
    this.initListeners();

  }




  private initListeners() {

    //! con runoutsideaNGULAR  revisa eventos ajenos de la app
    this.ngZone.runOutsideAngular(() => {
      merge(
        fromEvent(window, 'online').pipe(map(() => true)),
        fromEvent(window, 'offline').pipe(map(() => false))
      ).subscribe(isOnline => {
        this.ngZone.run(() => {
          //! en este ejemplo cuando pasa u n evento pues se avisara con 
          //!next 
          this.onlineStatus$.next(isOnline)
        })
      })
    })
  }

  get isOnline$(): Observable<boolean> {

    return this.onlineStatus$.asObservable();


  }
}
