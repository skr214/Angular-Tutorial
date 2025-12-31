import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "../../reusable-components/toast/toast.component";
import { Router, RouterLink } from "@angular/router";
import { StorageService } from '../../services/storage-service/storage.service';
import { SharedService } from '../../services/shared-service/shared.service';

declare const bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  message = '';
  users: any[] = [];


  @ViewChild('loginForm') loginForm !: NgForm;

  constructor(private authService: AuthService, private router: Router,
    private storage: StorageService, private shared: SharedService) { }

  onSubmit() {
    this.onLogin(this.loginForm.value.userId, this.loginForm.value.password);
    this.loginForm.reset();
  }

  onLogin(email: string, password: string) {

    this.authService.login(email, password).subscribe(users => {
      this.users = users;
      if (this.users.length > 0) {
        this.message = '✅ Login successful!';
        // You can save to localStorage for session
        this.storage.set('user', JSON.stringify(this.users[0]));
        this.shared.changeState(true);
        this.router.navigate(['/rxjs']);
      } else {
        this.message = '❌ Invalid credentials!';
      }
      // code for toast
      const toastLiveExample = document.getElementById('liveToast')
      if (this.message) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
      }
    });

  }

}

