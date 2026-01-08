import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/utility-service/utility.service';
import { from, Observable, Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-custom-observable',
  standalone: true,
  imports: [NgClass],
  templateUrl: './custom-observable.component.html',
  styleUrls: ['./custom-observable.component.scss']
})
export class CustomObservableComponent implements OnInit {

  constructor(private _utilityService: UtilityService) { }


  // Ex - 01 (Manual)
  obsStatusManual: string = '';
  obsStatus: string = '';
  obsStatusRandom: string = '';
  sub1!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;
  currentName!: string;

  customObservable = new Observable(observer => {

    setTimeout(() => {
      observer.next('Angular');
    }, 1000);

    setTimeout(() => {
      observer.next('JavaScript');
    }, 2000);

    setTimeout(() => {
      observer.next('Typescript');
      // observer.error('Something went wrong!');
    }, 3000);

    setTimeout(() => {
      observer.next('RxJS');
      observer.complete();
    }, 4000);
  });

  // Ex - 02 (Custom Interval Observable)
  customIntervalObservable = new Observable(observer => {
    let topics = ['Angular', 'JavaScript', 'TypeScript', 'RxJS', 'HTML', 'CSS', 'Node.js'];
    let count = 0;
    const interval = setInterval(() => {
      observer.next(topics[count++]);
      console.log(count);

      if (count > 2) {
        clearInterval(interval);
        observer.error('Something went wrong!');
      }

      if (count > 5) {
        clearInterval(interval);
        observer.complete();
      }

    }, 1000);
  });

  // Ex - 03
  names = ['Sonu', 'Monu', 'Ravi', 'Anu', 'Manu', 'Tina', 'Sana', 'Lina'];
  randomNamesObservable = new Observable<string>(observer => {
    let count = 0;
    const interval = setInterval(() => {
      observer.next(this.names[count++]);

      if (count > 2) {
        clearInterval(interval);
        observer.error('Something went wrong!');
      }

      if (count >= 4) {
        clearInterval(interval);
        observer.complete();
      }
    }, 2000);
  });

  ngOnInit(): void {
    // Ex - 01
    this.sub1 = this.customObservable.subscribe({
      next: (res) => {
        console.log(res);
        this._utilityService.print('container', res + '');
      },
      error: (err) => {
        this.obsStatusManual = 'error';
        console.log(err);
      },
      complete: () => {
        this.obsStatusManual = 'complete';
        console.log('Observable completed');
      }
    });

    // Ex - 02
    this.sub2 = this.customIntervalObservable.subscribe({
      next: (res) => {
        console.log(res);
        this._utilityService.print('container2', res + '');
      },
      error: (err) => {
        this.obsStatus = 'error';
        console.log(err);
      },
      complete: () => {
        this.obsStatus = 'complete';
        console.log('Observable completed');
      }
    });

    // Ex - 03
    this.sub3 = this.randomNamesObservable.subscribe({
      next: (res) => {
        console.log(res);
        this.currentName = res;
      },
      error: (err) => {
        this.obsStatusRandom = 'error';
        console.log(err);
      },
      complete: () => {
        this.obsStatusRandom = 'complete';
        console.log('Observable completed');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

}
