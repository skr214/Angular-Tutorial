import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, map, Subscription } from 'rxjs';
import { UtilityService } from '../../../services/utility-service/utility.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnDestroy {

  observable = interval(1000);

  msg1: any;
  msg2: any;
  msg3: any;

  sub1!: Subscription
  sub2!: Subscription
  sub3!: Subscription

  constructor(private _utilityService: UtilityService) { }

  ngOnInit(): void {
    // Ex - 01
    this.sub1 = this.observable.pipe(
      map(value => 'Video' + value)
    ).subscribe(res => {
      console.log('Emitted value:', res);
      this.msg1 = res;
    });

    setTimeout(() => {
      this.sub1.unsubscribe();
    }, 10000);

    // Ex - 02
    this.sub2 = this.observable.pipe(
      map(value => value * 10)
    ).subscribe(res => {
      console.log('Emitted value:', res);
      this.msg2 = res;
    });

    setTimeout(() => {
      this.sub2.unsubscribe();
    }, 10000);

    // Ex - 03
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Alice' },
      { id: 3, name: 'Bob' },
      { id: 4, name: 'Eve' },
      { id: 5, name: 'Charlie' },
      { id: 6, name: 'Dave' },
      { id: 7, name: 'Eva' },
      { id: 8, name: 'Frank' },
      { id: 9, name: 'Grace' },
      { id: 10, name: 'Hannah' }
    ];
    const usersObservable = from(users);
    this.sub3 = usersObservable.pipe(
      map(value => value.name)
    ).subscribe(res => {
      console.log('Emitted value:', res);
      this.msg3 = res;
      this._utilityService.print('elContainer', this.msg3);
    });

  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}

