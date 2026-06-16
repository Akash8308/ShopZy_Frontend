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
      const code = this.route.snapshot.queryParamMap.get('code');
    
      if (code) {
        this.store.dispatch(exchange({ code }) 
        );
      }
  }
}
