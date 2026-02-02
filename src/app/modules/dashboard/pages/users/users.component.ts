import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { TableColumn } from '../../../../interfaces/table.interface';
import { UserService } from './services/user.service';
import { IUser } from './interfaces/user.interface';
import { ToastService } from '../../../../shared/services/Toast.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false
})
export class UsersComponent implements OnInit {



  //sELECCIONAR cada usuario 
  selectedUser: IUser | null = null

  loadingUser = false;

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



  private searchSubject = new Subject<string>();



  constructor(
    private readonly _toastService: ToastService,
    private readonly _userService: UserService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _ngZone: NgZone) { }

  ngOnInit() {
    console.log("Si activa")
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.pagination.page = 1;
      this.getAll(term);
    });

    this.getAll()
  }

  trackById(index: number, user: IUser) {
    return user.id
  }

  //todo investigar
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  selectUser(user: IUser) {
    if (this.selectedUser?.id === user.id) return;

    this.loadingUser = true;

    this._userService.getById(user.id).subscribe({
      next: (response: any) => {
        setTimeout(() => {
          this._ngZone.run(() => {
            this.selectedUser = response.data.data ? response.data.data : response.data;
            this.loadingUser = false;
            this._cdr.detectChanges();
          });
        }, 100);


      },
      error: (err) => {
        this._ngZone.run(() => {
          this._toastService.show('Error al cargar detalle', 'error');
          this.loadingUser = false;
          this._cdr.detectChanges();
        });
      }
    });
  }





  getAll(searchTerm?: string) {


    //recuerdo 
    this._userService.getAll(this.pagination.page, this.pagination.limit, searchTerm).subscribe({

      next: (response) => {

        const data = response.data;

        this._ngZone.run(() => {
          this.userList = [...data.items];
          this.pagination.total = data.pagination.total;
        });

        this._cdr.markForCheck(); // Marca para revisar
        this._cdr.detectChanges()


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