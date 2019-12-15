import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[img-preloader]',
  host: {
    '[attr.src]': 'finalImage'
  }
})
export class ImgPreloaderDirective implements OnInit {

  @Input('img-preloader') targetSource: string;
  @Input('default-image') defaultImage: string = 'assets/img/preloader.gif';

  downloadingImage: any;
  finalImage: any;

  constructor() { }

  ngOnInit(): void {
    //set the final image to default image as placeholder
    this.finalImage = this.defaultImage;

    this.downloadingImage = new Image();
    this.downloadingImage.onload = () => {
      this.finalImage = this.targetSource;
    };
    this.downloadingImage.src = this.targetSource;
  }
}
