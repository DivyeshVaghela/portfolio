import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';

import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[animateOnScroll]'
})
export class AnimateOnScrollDirective {

  private offsetTop: number;
  //checks if the element is already visible or not on which this directive is applied
  private isVisible: boolean;
  private winHeight: number;

  //subscriptions to handle the scroll and resize observable
  private scrollSub: Subscription;
  private resizeSub: Subscription;

  //name of the animation class
  @Input() animationName: string = 'zoomOut';
  //speed of the animation
  @Input() animationSpeed: 'slower'|'slow'|'normal'|'fast'|'faster' = 'normal';
  readonly timings = { slower: '3s', slow: '2s', normal: '1s', fast: '500ms', faster: '300ms' };

  // Pixel offset from screen bottom to the animated element to determine the start of the animation
  @Input() offset: number = 80;

  private get id(): string{
    return this.elementRef.nativeElement.id;
  }

  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    if (!this.animationName){
      throw new Error('animationName required');
    }

    //default visibility to false
    this.isVisible = false;

    //handle the scroll event
    this.scrollSub = this.scrollService.scrollObs.subscribe(() => this.manageVisibility());

    //handle the resize event
    this.resizeSub = this.scrollService.resizeObs.subscribe(() => this.manageVisibility());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.manageVisibility(), 1);
  }

  private manageVisibility(){
    if (this.isVisible){
      //nothing to do if the animation (class) has already been applied
      return;
    }

    // check for window height, may change with a window resize
    this.getWinHeight();
    // get vertical position for selected element
    this.getOffsetTop();

    // we should trigger the addition of the animation class a little after getting to the element
    const scrollTrigger = this.offsetTop + this.offset - this.winHeight;

    if (this.scrollService.pos >= scrollTrigger){
      this.addAnimationClass();
    }
  }

  getWinHeight(){
    this.winHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  }

  /**
   * get the vertical position of the element
   */
  getOffsetTop(){
    if (typeof this.elementRef.nativeElement.getBoundingClientRect === 'function'){
      const viewportTop = this.elementRef.nativeElement.getBoundingClientRect().top;
      const clientTop = this.elementRef.nativeElement.clientTop;

      //vertical position of the element
      this.offsetTop = viewportTop + this.scrollService.pos - clientTop;
    } else {
      this.offsetTop = 0;
    }
  }

  /**
   * utility function to mark element visible and add css class
   */
  addAnimationClass(){
    this.isVisible = true;
    //add the animation classes one by one
    this.renderer.addClass(this.elementRef.nativeElement, 'animated');
    this.renderer.setStyle(this.elementRef.nativeElement, 'animation-duration', this.timings[this.animationSpeed]);
    for (const c of this.animationName.split(' ')) {
      this.renderer.addClass(this.elementRef.nativeElement, c);
    }
    //release the subscriptions because there is no reason to 
    // listen for scrolling once the animation is applied
    this.releaseSubscription();
  }

  releaseSubscription(){
    if (this.scrollSub != null){
      this.scrollSub.unsubscribe();
      this.scrollSub = null;
    }
    if (this.resizeSub != null){
      this.resizeSub.unsubscribe();
      this.resizeSub = null;
    }
  }

  ngOnDestroy(): void {
    this.releaseSubscription();
  }
}
