import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../../interfaces/table.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-list',
  imports: [CommonModule],
  templateUrl: './table-list.component.html',

  standalone: true
})
//!Aplicaremos buena practica y haremos que no sea Any y modifiquemos esto para que 
//!reciba un generico y se maneje por el tipo ingresado 
export class TableListComponent<T extends Record<string, any>> implements OnInit {


  @Input() data: T[] = []
  @Input() columns: TableColumn[] = []


  //Dicho evento que suceda vamos a devolver un objeto 
  //recibe un objeto el eventemitter en este cas le paso la fila el generico y el string que seria
  //cual accion llamo puede ser delete etc 
  @Output() onAction = new EventEmitter<{ row: T, action: string }>();


  handleAction(row: T, actionType: string) {
    this.onAction.emit({ row, action: actionType })

  }



  constructor() { }

  ngOnInit() {
  }

}
