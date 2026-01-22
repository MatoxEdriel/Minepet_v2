import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridStack, GridStackWidget } from 'gridstack';
import { DashboardCard } from '../../../../interfaces/card.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit {



  //Dashboard card interactivos 
  //! -Faltantes guardar la posicion 
  //! Definir que informacion mostrar 

  @ViewChild('grid', { static: false }) gridElement!: ElementRef;



  //todo listo para hacer un servicio de opciones de data 
  cards: DashboardCard[] = [
    {
      id: 'ventas',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      title: 'Ventas',
      description: 'Resumen de ventas'
    },
    {
      id: 'usuarios',
      x: 4,
      y: 0,
      w: 4,
      h: 2,
      title: 'Usuarios',
      description: 'Usuarios activos'
    },
    {
      id: 'reportes',
      x: 8,
      y: 0,
      w: 4,
      h: 2,
      title: 'Reportes',
      description: 'Estado del sistema'
    }
  ];


  trackById(index: number, card: DashboardCard): string {
    return card.id;
  }



  constructor() { }

  ngOnInit() {
  }


  grid?: GridStack;
  ngAfterViewInit(): void {
    this.grid = GridStack.init(
      {
        column: 12,
        margin: 36,

        draggable: {},
        resizable: { handles: 'all' }
      },
      this.gridElement.nativeElement
    );
  }


  card(title: string): string {
    return `
      <div class="grid-stack-item-content">
        <strong>${title}</strong>
      </div>
    `;
  }

}
