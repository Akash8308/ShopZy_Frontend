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
  imports: [CommonModule, ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    // backend error handling

  }

  // optional explicit handler (if you used (input))
  clearError(): void {
    this.errorMessage = null;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.store.dispatch(login({ username, password }));

    this.store.select(selectAuthError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(error => {
        if (!error) return;

        this.errorMessage = error;
      });

    // 👇 BEST FIX: clear error on any typing
    this.loginForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.errorMessage = null;
      });
  }

}