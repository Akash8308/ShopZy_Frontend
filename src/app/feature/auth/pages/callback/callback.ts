import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { exchange } from '../../../auth/states/auth.actions';
@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.scss',
})
export class Callback {

   private route = inject(ActivatedRoute);
  private store = inject(Store);

  public ngOnInit(){
      const token = this.route.snapshot.queryParamMap.get('token');
    
      if (token) {
        this.store.dispatch(exchange({ token }) 
        );
      }
  }
}
