import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private localStorageService: LocalStorageService) {
  }

  private async getNameFromLocalStorage(): Promise<User.Properties['name']> {
    const delay = new Promise(resolve => setTimeout(resolve, 0));

    try {
      await delay;

      return this.localStorageService.getItem('name') || ''
    } catch (e) {
      localStorage.removeItem('items');
      return '';
    }
  }

  private async setNameInLocalStorage(name: User.Properties['name']): Promise<User.Properties['name']> {
    const delay = new Promise(resolve => setTimeout(resolve, 0));

    try {
      await delay;

      this.localStorageService.setItem('name', name)

      return name;
    } catch (e) {
      localStorage.removeItem('items');
      return '';
    }
  }

  getName(): Observable<string> {
    return from(this.getNameFromLocalStorage());
  }

  setName(name: User.Properties['name']): Observable<User.Properties['name']> {
    return from(this.setNameInLocalStorage(name));
  }
}
