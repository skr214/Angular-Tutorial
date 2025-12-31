import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  print(containerID: string, value: string): void {
    const el = document.createElement('li');
    el.innerText = value;
    document.getElementById(containerID)?.appendChild(el);
  }
}
