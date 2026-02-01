import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { last } from 'rxjs';
import { ToastService } from '../../../../../../shared/services/Toast.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ToastComponent } from "../../../../../../shared/components/toast/toast.component";
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  imports: [ReactiveFormsModule, CommonModule, LottieComponent, ToastComponent]
})
export class CreateUserComponent implements OnInit {


  //!siTUAICON le debo pasar el id del rol 

  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;


  @Output() userSaved = new EventEmitter<void>();

  userForm!: FormGroup;

  idSelected: number | null = null;

  isSuccess: boolean = false;


  /*

{
  "user_name": "dsddsd",
  "name": "xd",
  "last_name": "xdxdxd",
  "email": "dsds@hoxtmail.com",
  "phone": "0998877665",
  "address": "Calle Falsa 123",
  "birthday_day": "1990-10-25",
  "role_id": 1
}


  */

  emailDespite: AnimationOptions = {
    path: '/email.json',
    loop: true,
    autoplay: true


  }


  optionsSuccess: AnimationOptions = {
    path: '/veterinarian_created.json',
    loop: false,
    autoplay: true
  };
  roles = [

    { id: 1, label: 'Administrador' },
    { id: 2, label: 'Dueño' },
    { id: 3, label: 'Veterinario' },
  ]



  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toastService: ToastService

  ) {

  }


  ngOnInit() {

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      user_name: ['', Validators.required],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      role_id: ['', Validators.required],
      birthday_day: ['', Validators.required]

    });

    this.userForm.valueChanges.subscribe(v => {

      if (v.name && v.last_name) {
        const user_name = this.createUserName(v.name, v.last_name)
        this.userForm.patchValue({
          user_name: user_name

        }, { emitEvent: false })


      }






    })


  }


  sendPasswordEmail() {
    if (this.userForm.valid) {



    } else {

      this.userForm.markAllAsTouched();


    }


  }

  //Haremos un user name no mas con el nombre y apellido
  createUserName(name: string, last_name: string): string {
    return (name[0] + last_name).toLowerCase();
  }

  open() {
    this.userForm.reset();
    this.modalRef.nativeElement.showModal();
  }



  close() {
    this.modalRef.nativeElement.close()

  }

  resetState() {
    this.isSuccess = false;
    this.userForm.reset()
  }


  save() {
    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();
      return

    }

    const userData = this.userForm.value;

    this.userService.create(userData).subscribe({

      next: (response) => {
        this.toastService.show(response.message, 'success')
        this.isSuccess = true;

        this.userSaved.emit();
        setTimeout(() => {
          this.close();
          this.resetState();

        }, 2500)


      },
      error: (err) => {
        const apiError = err?.error;

        const message = apiError?.error || 'Usuario Existente'

        this.toastService.show(message, 'error')

        // this.toastService.show()

      }
    })


  }



}
