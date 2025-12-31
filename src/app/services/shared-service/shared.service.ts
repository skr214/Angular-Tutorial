import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private isLogedin = new BehaviorSubject<boolean>(false);
  $isLogedin = this.isLogedin.asObservable();

  changeState(value: boolean) {
    this.isLogedin.next(value);
  }

}
