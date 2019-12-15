import { Injectable, OnDestroy } from '@angular/core';

import { Observable, Subscription, fromEvent, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  
  scrollObs: Observable<any>;
  resizeObs: Observable<any>;
  pos: number;

  private scrollSub: Subscription = null;
  private resizeSub: Subscription = null;

  constructor() {
    //set the initial value
    this.manageScrollPos();

    //manage for scroll
    //create an observable that we can subscribe to, from component or directive
    this.scrollObs = typeof window !== 'undefined' ? fromEvent(window, 'scroll') : empty();
    //initate the subscription and update the values
    this.scrollSub = this.scrollObs.subscribe(() => this.manageScrollPos());

    //manage for resize
    //create observable for changes in screen size
    this.resizeObs = typeof window !== 'undefined' ? fromEvent(window, 'resize') : empty();
    //initiate the subscription and update the values
    this.resizeSub = this.resizeObs.subscribe(() => this.manageScrollPos());
  }

  private manageScrollPos(): void {
    this.pos = typeof window !== 'undefined' ? window.pageYOffset : 0;
  }

  ngOnDestroy(): void {
    if (this.scrollSub != null){
      this.scrollSub.unsubscribe();
      this.scrollSub = null;
    }
    if (this.resizeSub != null){
      this.resizeSub.unsubscribe();
      this.resizeSub = null;
    }
  }

}
