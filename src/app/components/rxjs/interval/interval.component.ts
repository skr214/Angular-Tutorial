import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/utility-service/utility.service';
import { interval, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-interval',
  standalone: true,
  imports: [],
  templateUrl: './interval.component.html',
  styleUrl: './interval.component.scss'
})
export class IntervalComponent implements OnInit, OnDestroy {

  obsMsg = '';
  subscribtion !: Subscription;

  constructor(private _utilityService: UtilityService) { }

  ngOnInit(): void {
    // Create an Observable that will publish a value on an interval
    //const brodcastVideo = interval(1000);

    // After 5 seconds, it will start to publish values every 1 second
    // timer(delay,interval)
    const brodcastVideo = timer(5000, 1000);

    // Create a subscription to the Observable to start listening for async result
    this.subscribtion = brodcastVideo.subscribe((res) => {
      this.obsMsg = 'Video ' + res;
      console.log(this.obsMsg);
      this._utilityService.print('container', this.obsMsg);
      this._utilityService.print('container1', this.obsMsg);
      this._utilityService.print('container2', this.obsMsg);

      if (res >= 5) {
        this.subscribtion.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
