import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../../services/shared-service/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLogedin = false;

  constructor(private route: Router, private shared: SharedService) { }

  ngOnInit(): void {
    this.isLogedin = !!localStorage.getItem('user');
    this.shared.changeState(this.isLogedin);
    this.shared.$isLogedin.subscribe(value => this.isLogedin = value);
  }

  onLogin() {
    if (this.isLogedin) {
      this.isLogedin = false;
      localStorage.removeItem('user');
      this.shared.changeState(this.isLogedin);
      this.route.navigate(['/login']);
    } else {
      this.route.navigate(['/login']);
      return;
    }
  }

}
