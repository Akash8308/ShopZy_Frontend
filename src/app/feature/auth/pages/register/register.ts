import { register } from 'module';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';


import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { login, logout } from '../../states/auth.actions';
import { selectAuthError, selectLoading } from '../../states/auth.selectors';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  submitted = false;

  RegistrationForm: FormGroup;

  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectLoading);

  constructor(private fb: FormBuilder) {

    this.RegistrationForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      name: [
        '',
        [
          Validators.required,
        ]
      ]
    });
  }

  ngOnInit(): void {

    // reset form on error (optional)
    this.error$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(error => {
        if (error) {
          // Keep the form values to allow user correction
          // but you can reset if preferred
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.RegistrationForm.invalid) return;

    const { email, password } = this.RegistrationForm.value;

    this.store.dispatch(register({ name, email, password }));
  }

  get email() {
    return this.RegistrationForm.get('email');
  }

  get password() {
    return this.RegistrationForm.get('password');
  }

  get name() {
    return this.RegistrationForm.get('name');
  }
}
