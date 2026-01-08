import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { filter, from, toArray } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  userArray = [
    { id: 1, name: 'John', gender: 'Male' },
    { id: 2, name: 'Jane', gender: 'Female' },
    { id: 3, name: 'Mike', gender: 'Male' },
    { id: 4, name: 'Sara', gender: 'Female' },
    { id: 5, name: 'Tom', gender: 'Male' },
    { id: 6, name: 'Anna', gender: 'Female' },
    { id: 7, name: 'Chris', gender: 'Male' },
    { id: 8, name: 'Kate', gender: 'Female' },
    { id: 9, name: 'David', gender: 'Male' },
    { id: 10, name: 'Emma', gender: 'Female' }
  ];

  filterUsersByLength: any = [];
  filterUsersByGender: any = [];
  filterUsersByNthItem: any = [];

  constructor() { }

  ngOnInit() {

    const userObservable = from(this.userArray);

    // Ex - 01
    const filteredUsersByLength = userObservable.pipe(
      filter(user => user.name.length > 4),
      toArray()
    );
    filteredUsersByLength.subscribe(user => {
      this.filterUsersByLength = user;
    });

    // Ex - 02 (Filtering male users)
    const maleUsers = userObservable.pipe(
      filter(user => user.gender === 'Male'),
      toArray()
    );

    maleUsers.subscribe(user => {
      this.filterUsersByGender = user;
    });

    // Ex - 03 (Filtering nth users)
    const nthUsers = userObservable.pipe(
      filter(user => user.id <= 3),
      toArray()
    );

    nthUsers.subscribe(user => {
      this.filterUsersByNthItem = user;
    });
  }

}
