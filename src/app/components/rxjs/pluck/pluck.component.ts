import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { from, of, pluck, toArray } from 'rxjs';

@Component({
  selector: 'app-pluck',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pluck.component.html',
  styleUrl: './pluck.component.scss'
})
export class PluckComponent {

  nameList: any[] = [];
  cityList: any[] = [];

  constructor() { }

  users = [
    { name: 'Sonu', age: 24, skill: 'Angular', address: { city: 'Delhi', country: 'India' } },
    { name: 'Monu', age: 25, skill: 'React', address: { city: 'Mumbai', country: 'India' } },
    { name: 'Tonu', age: 26, skill: 'Vue', address: { city: 'Chennai', country: 'India' } },
    { name: 'Bonu', age: 27, skill: 'Node', address: { city: 'Kolkata', country: 'India' } },
    { name: 'Gonu', age: 28, skill: 'Java', address: { city: 'Bangalore', country: 'India' } },
    { name: 'Lalu', age: 29, skill: 'Python', address: { city: 'Hyderabad', country: 'India' } },
  ];

  ngOnInit(): void {
    // Example 1: Extracting 'name' property from each user object
    from(this.users).pipe(
      pluck('name'),
      toArray()
    ).subscribe(res => {
      this.nameList = res;
    });

    // Example 2: Extracting 'city' property from nested 'address' object of each user
    from(this.users).pipe(
      pluck('address', 'city'),
      toArray()
    ).subscribe(res => {
      this.cityList = res;
    });

  }

}

