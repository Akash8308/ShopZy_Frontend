import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { login, logout } from '../../states/auth.actions';
import { selectAuthError, selectLoading } from '../../states/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: '../../auth.scss'
})
export class Login implements OnInit {

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  submitted = false;

  loginForm: FormGroup;

  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectLoading);

  constructor(private fb: FormBuilder) {

    this.loginForm = this.fb.group({
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

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.store.dispatch(login({ email, password }));
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  protected loginWithGithub() {
  window.location.href =
    `${environment.apiBaseUrl}/oauth2/authorization/github`;
  }

  protected loginWithGoogle() {
  window.location.href =
    `${environment.apiBaseUrl}/oauth2/authorization/google`;
  }
}