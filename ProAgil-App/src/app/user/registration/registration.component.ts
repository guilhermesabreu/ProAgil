import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public fb: FormBuilder
            ) {}

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        userName: ['', Validators.required],
        password: ['', Validators.required, Validators.minLength(4)],
        confirmPassword: ['', Validators.required]
      }
    );
  }

  cadastrarUsuario() {
   console.log(' Cadastrar Usuário ');
  }

}
