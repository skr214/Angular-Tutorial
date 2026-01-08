import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs';

@Component({
  selector: 'app-retry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retry.component.html',
  styleUrl: './retry.component.scss'
})
export class RetryComponent implements OnInit {

  userData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      retry(3)
    ).subscribe({
      next: (data) => {
        this.userData = data;
        console.log('User Data:', this.userData);
      },
      error: (error) => console.error('Error occurred:', error)
    });
  }

}
