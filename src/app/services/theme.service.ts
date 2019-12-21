import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  renderer: Renderer2;
  private currentTheme: string = 'light-theme';

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,

    private userService: UserService
  ) {
    //renderer to change the theme
    this.renderer = this.rendererFactory.createRenderer(null, null);

    // this.currentThemeObs = new BehaviorSubject<string>(this.currentTheme);
  }

  setTheme(theme: string){
    if (theme === 'light-theme'){
      this.renderer.removeClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.addClass(this.document.body, 'dark-theme');
    }
    this.currentTheme = theme;
    this.userService.setUserPreferences({ theme: this.currentTheme });
  }

  toggleTheme() {
    this.setTheme(this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme');
  }
}
