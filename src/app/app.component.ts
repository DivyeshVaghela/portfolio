import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  title = 'portfolio';
  previousUrl = null;
  isNavbarCollapsed = true;

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (this.previousUrl && this.previousUrl != this.removeFragmentFromURL(this.router.url)){
            window.scrollTo(0, 0);
          }
          if (element) { element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}); }
        } else {
          if (!(event instanceof NavigationEnd)) {
            return;
          }
          window.scrollTo(0, 0);
        }
        this.isNavbarCollapsed = true;
        this.previousUrl = this.removeFragmentFromURL(this.router.url);
      }
    });
  }

  removeFragmentFromURL(url: string){
    if (url.indexOf('#') == -1)
      return url;
    return url.substring(0, this.router.url.indexOf('#'));
  }
  
  headerHeight: number = 100;
  headerFixed = false;

  @HostListener("window:scroll")
  onWindowScroll() {
    if (!this.headerFixed && window.scrollY > this.headerHeight){
      this.headerFixed = true;
    } else if (this.headerFixed && window.scrollY <= this.headerHeight) {
      this.headerFixed = false
    }
  }
}
