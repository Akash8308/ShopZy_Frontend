import { CommonModule } from '@angular/common';
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

import { login } from '../../states/auth.actions';
import { selectAuthError } from '../../states/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  submitted = false;

  loginForm: FormGroup;

  error$ = this.store.select(selectAuthError);

  constructor(private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9._]{3,20}$/)
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

  ngOnInit(): void {

    // reset form on error (optional)
    this.error$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(error => {
        if (error) {
          this.loginForm.reset();
          this.submitted = false;
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.store.dispatch(login({ username, password }));

    // 🔥 OPTIONAL: navigate after success (needs success action in effect)
    // this.router.navigate(['/']);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}