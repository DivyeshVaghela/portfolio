import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollService } from './services/scroll.service';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { UserPreference } from './models/User.model';
import { ThemeService } from './services/theme.service';

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
    private router: Router,

    private scrollService: ScrollService,
    private themeService: ThemeService,
    private userService: UserService
  ){ }

  ngOnInit() {
    //collapse the NavBar when screen is resized
    this.scrollService.resizeObs.subscribe(() => {
      this.isNavbarCollapsed = true;
    });
    
    this.handleRouteChange();
    this.handleUserPreferences();
  }


  /** Route change */
  handleRouteChange(){
    //fragment based routing on the same page and scroll to top
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
  /** END: Route change */


  /** NavBar fixed or transparent */
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
  /** END: NavBar fixed or transparent */


  /** User Preferences */
  userPrefSub$: Subscription;

  handleUserPreferences() {
    this.userPrefSub$ = this.userService.userPreferencesObs.subscribe((userPref: UserPreference) => {
      if (userPref && userPref.theme){
        this.themeService.setTheme(userPref.theme);
      }
    });
  }

  toggleTheme(){
    this.themeService.toggleTheme();
  }
  /** END: User Preferences */
}
