import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, of, Subscription } from 'rxjs';
import { UtilityService } from '../../../services/utility-service/utility.service';

@Component({
  selector: 'app-of-from',
  standalone: true,
  imports: [],
  templateUrl: './of-from.component.html',
  styleUrl: './of-from.component.scss'
})
export class OfFromComponent implements OnInit, OnDestroy {

  obsMsg: any;
  obsSubscription!: Subscription

  constructor(private _utilityService: UtilityService) { }

  ngOnInit(): void {
    // of
    const obs1 = of('Sonu', 'Kumar', 'Ray');
    this.obsSubscription = obs1.subscribe(res => {
      console.log(res);
      this._utilityService.print('container', res);
    });

    const obs2 = of({ a: 'Sonu', b: 'Kumar', c: 'Ray' });
    this.obsSubscription = obs2.subscribe(res => {
      console.log(res);
      this.obsMsg = res;;
    });

    // from - Array
    const obs3 = from(['Sonu', 'Kumar', 'Ray']);
    this.obsSubscription = obs3.subscribe(res => {
      console.log(res);
      this._utilityService.print('container3', res);
    });

    // from - Promise
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise resolved successfully!');
      }, 3000);
    });

    const obs4 = from(promise);
    this.obsSubscription = obs4.subscribe(res => {
      console.log(res);
      this._utilityService.print('container4', res + '');
    });

    // from - String
    const obs5 = from('Sonu Kumar Ray');
    this.obsSubscription = obs5.subscribe(res => {
      console.log(res);
      this._utilityService.print('container5', res);
    });
  }

  ngOnDestroy(): void {
    this.obsSubscription?.unsubscribe();
  }

}
