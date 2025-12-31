import { Component, OnInit } from '@angular/core';
import { from, interval, of, Subscription, take, toArray } from 'rxjs';

@Component({
  selector: 'app-to-array',
  standalone: true,
  imports: [],
  templateUrl: './to-array.component.html',
  styleUrl: './to-array.component.scss'
})
export class ToArrayComponent implements OnInit {

  obsSubscription !: Subscription;
  convertedArray: any[] = [];
  coustamArray: string[] = ['Sonu', 'Kumar', 'Ray'];
  convertedArray1: any[] = [];
  convertedArray2: any[] = [];


  constructor() { }

  ngOnInit(): void {

    // Example 1 - Using interval
    let obsSource = interval(1000);
    this.obsSubscription = obsSource.pipe(
      take(5),
      toArray()
    ).subscribe(res => {
      console.log(res);
      this.convertedArray = res;
    });

    // Example 2 - Using coustam Array
    let obsSource1 = from(this.coustamArray);
    this.obsSubscription = obsSource1.pipe(
      toArray()
    ).subscribe(res => {
      console.log(res);
      this.convertedArray1 = res;
    });

    // Example 3 - Using random data
    let obsSource2 = of('A', 'B', 'C', 'D', 'E');
    this.obsSubscription = obsSource2.pipe(
      toArray()
    ).subscribe(res => {
      console.log(res);
      this.convertedArray2 = res;
    });
  }

}
