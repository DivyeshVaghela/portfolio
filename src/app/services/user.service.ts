import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { UserPreference } from '../models/User.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userPreferencesObs: BehaviorSubject<UserPreference> = null;
  readonly _userPreferences: string = 'userPreferences';

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.userPreferencesObs = new BehaviorSubject<UserPreference>(null);
    
    const userPref = this.getUserPreferences();
    if (userPref != null){
      this.userPreferencesObs.next(userPref);
    }
  }

  setUserPreferences(preferences: UserPreference){
    this.localStorageService.set(this._userPreferences, preferences);
  }

  getUserPreferences(): UserPreference {
    return this.localStorageService.get(this._userPreferences) as UserPreference;
  }

}
