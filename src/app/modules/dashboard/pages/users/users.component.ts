import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../../interfaces/table.interface';
import { UserService } from './services/user.service';
import { IUser } from './interfaces/user.interface';
import { ToastService } from '../../../../shared/services/Toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false
})
export class UsersComponent implements OnInit {



  //sELECCIONAR cada usuario 
  selectedUser: IUser | null = null


  userList: IUser[]
    = []

  pagination = {
    page: 1,
    limit: 5,
    total: 0

  }


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


  // userList = [
  //   { id: 1, name: 'Gabriel Gomez', email: 'gabriel@techfix.com', role: 'Admin', status: 'Activo' },
  //   { id: 2, name: 'Maria Perez', email: 'maria@techfix.com', role: 'Vendedor', status: 'Inactivo' },
  //   { id: 3, name: 'Carlos Ruiz', email: 'carlos@techfix.com', role: 'Técnico', status: 'Pendiente' },
  // ];







  constructor(
    private readonly _toastService: ToastService,
    private readonly _userService: UserService) { }

  ngOnInit() {
    console.log("Si activa")
    this.getAll();
  }

  trackById(index: number, user: IUser) {
    return user.id
  }

  selectUser(user: IUser) {
    this._userService.getById(user.id).subscribe({
      next: (response: any) => {
        this.selectedUser = response.data.data;
      },
      error: (err) => {
        this._toastService.show('Error al cargar detalle', 'error');
      }
    });
  }






  getAll() {


    //recuerdo 
    this._userService.getAll(this.pagination.page, this.pagination.limit).subscribe({

      next: (response) => {

        const data = response.data;

        this.userList = data.items.map(user => ({
          ...user
        }));

        this.pagination.total = data.pagination.total;




      },
      error: (err) => {
        const apiError = err.error;
        let message = apiError?.message

        this._toastService.show(message, 'error')

      }



    })







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
    this.getAll();
  }
}