import { Component } from '@angular/core';
import { interval, map, Subscription, tap } from 'rxjs';
import { UtilityService } from '../../../services/utility-service/utility.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.scss'
})
export class TapComponent {

  sub1 !: Subscription;
  sub2 !: Subscription
  selectedColor: string = '';

  constructor(private _utilityService: UtilityService) { }

  ngOnInit(): void {
    const source = interval(1000);

    // Ex - 01
    const userNames = ['Sonu', 'Kumar', 'Ray', 'John', 'Doe', 'Smith', 'Jane', 'Halt', 'Finish', 'End'];

    this.sub1 = source.pipe(
      tap(val => {
        // console.log('Before map : ', val);
        if (val === 7) {
          this.sub1.unsubscribe();
        }
      }),
      map(val => userNames[val]),
      // tap(val => { console.log('After map : ', val); })
    ).subscribe(val => {
      this._utilityService.print('container1', val);
    });

    // Ex - 02
    const colours = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Black', 'Gray', 'Pink', 'Brown', 'Cyan', 'Magenta', 'Lime', 'Teal', 'Indigo', 'Violet'];

    this.sub2 = source.pipe(
      tap(val => {
        // console.log('Before map : ', val);
        this.selectedColor = colours[val];
        if (val === 15) {
          this.sub2.unsubscribe();
        }
      }),
      map(val => colours[val]),
      //tap(val => { console.log('After map : ', val); })
    ).subscribe(val => {
      console.log(val);
      this._utilityService.print('container2', val);
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
