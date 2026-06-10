import { CommonModule } from '@angular/common';
import { register } from '../../states/auth.actions';
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
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: '../../auth.scss',
})
export class Register {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  submitted = false;
  showPassword = false;

  RegistrationForm: FormGroup;

  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectLoading);

  constructor(private fb: FormBuilder) {

    this.RegistrationForm = this.fb.group({
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
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
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
            )
          ]
        ]
      });
  }

  protected onLoginClicked() {
    this.router.navigate(['/login']);
  }

  
  protected onloginWithGithubClicked(){
    window.location.href =
        `${environment.apiBaseUrl}/oauth2/authorization/github`;
  }
  
  protected onloginWithGoogleClicked(){
    window.location.href =
        `${environment.apiBaseUrl}/oauth2/authorization/google`;
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

    const { name, email, password } = this.RegistrationForm.value;

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

  protected loginWithGithub() {
  window.location.href =
    `${environment.apiBaseUrl}/oauth2/authorization/github`;
  }

  protected loginWithGoogle() {
  window.location.href =
    `${environment.apiBaseUrl}/oauth2/authorization/google`;
  }
}
