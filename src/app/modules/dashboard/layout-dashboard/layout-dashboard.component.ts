import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';
import { MenuSection } from '../../../interfaces/menu.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDashboardComponent {
  //!Comportamiento de layout principal
  //? Angular por defecto detecta cambios de estado por todo los componentes 
  /*
  Empezando por la raiz, de lo cual puede ocasionar poca optimizacion 
  por default revisara todas las variables y asi bajara a los demas componentes 
  ejemplo al ser padre de todo 
  con el ChangeDetectionStrategy.OnPush  
 es como que si le estuviera diciendo a angular oye solo debe revisar si algo importante
 pasa en este componente, eso es ONPUSH 
  */

 
  private readonly menuService = inject(MenuService);
  readonly menuData$ = this.menuService.getMenu();
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
