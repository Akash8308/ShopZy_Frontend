import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { exchange, loginSuccess } from '../../../auth/states/auth.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.scss',
})
export class Callback {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private actions$ = inject(Actions);

  ngOnInit() {
    const code = this.activatedRoute.snapshot.queryParamMap.get('code');

    if (code) {
      this.store.dispatch(exchange({ code }) 
      );
      
      this.actions$.pipe(
          ofType(loginSuccess),
          take(1)
        ).subscribe(() => {
          console.log('Exchange completed');
          this.router.navigate(['/home']);
        });
    }
  }
}
