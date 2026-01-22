import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../../interfaces/table.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false
})
export class UsersComponent implements OnInit {


  tableColumns: TableColumn[] = [
    { label: 'Nombre Completo', def: 'name', type: 'text' },
    { label: 'Correo', def: 'email', type: 'text' },
    { label: 'Rol', def: 'role', type: 'text' },
    { label: 'Estado', def: 'status', type: 'status' },
    {
      label: 'Acciones',
      def: '',
      type: 'action',
      actions: [
        { icon: 'fa-solid fa-pen', actionType: 'edit', color: 'text-blue-600' },
        { icon: 'fa-solid fa-trash', actionType: 'delete', color: 'text-red-600' }
      ]
    }
  ];


  userList = [
    { id: 1, name: 'Gabriel Gomez', email: 'gabriel@techfix.com', role: 'Admin', status: 'Activo' },
    { id: 2, name: 'Maria Perez', email: 'maria@techfix.com', role: 'Vendedor', status: 'Inactivo' },
    { id: 3, name: 'Carlos Ruiz', email: 'carlos@techfix.com', role: 'Técnico', status: 'Pendiente' },
  ];

  constructor() { }

  ngOnInit() {
  }


  handleTableAction(event: { row: any, action: string }) {
    console.log('Evento recibido del hijo:', event);

    if (event.action === 'edit') {
      alert(`Editando al usuario: ${event.row.name}`);

    } else if (event.action === 'delete') {
      const confirmDelete = confirm(`¿Estás seguro de borrar a ${event.row.name}?`);
      if (confirmDelete) {
        this.userList = this.userList.filter(u => u.id !== event.row.id);
      }
    }
  }



  createUser() {


  }

  refreshTable() {
    console.log("xdxd")
  }
}