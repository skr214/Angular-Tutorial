import { Component } from '@angular/core';
import { from, fromEvent, interval, map, Subscription, take, takeLast, takeUntil, timer } from 'rxjs';
import { UtilityService } from '../../../services/utility-service/utility.service';

@Component({
  selector: 'app-take',
  standalone: true,
  imports: [],
  templateUrl: './take.component.html',
  styleUrl: './take.component.scss'
})
export class TakeComponent {

  sub !: Subscription;

  constructor(private _utilityService: UtilityService) { }

  ngOnInit(): void {

    const randomNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];

    const nameSource = from(randomNames);

    // Ex - 01 | take(n)
    nameSource.pipe(
      take(5) // Take the first 5 names
    ).subscribe(name => this._utilityService.print('container1', name));

    // Ex - 02 | takeLast(n)
    nameSource.pipe(
      takeLast(3) // Take the last 3 names
    ).subscribe(name => this._utilityService.print('container2', name));

    // Ex - 03 | takeUntil(condition)
    let condition1 = timer(5000); // Condition to stop after 5 seconds
    let condition2 = fromEvent(document, 'click'); // Condition to stop on click event
    const source = interval(1000);
    this.sub = source.pipe(
      map(res => randomNames[res]),
      takeUntil(condition1)
    ).subscribe(name => this._utilityService.print('container3', name));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
