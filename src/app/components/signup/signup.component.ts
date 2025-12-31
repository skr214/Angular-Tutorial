import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { ToastComponent } from "../../reusable-components/toast/toast.component";
import { usernameValidator } from '../../custom-validators/username.validator';
import { passwordValidator } from '../../custom-validators/password.validator';
import { mustMatch } from '../../custom-validators/confirm-password-match.validator';


declare const bootstrap: any;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  message: string = "";
  user_name: string = "";
  isSubmitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5), usernameValidator]),
    accountType: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6), passwordValidator]),
    confirmPassword: new FormControl('', [Validators.required]),
    acceptTerms: new FormControl('', Validators.requiredTrue)
  }, { validators: mustMatch('password', 'confirmPassword') });

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          this.message = "Signup completed please login";
          this.user_name = this.signupForm.value.firstName || '';

          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert("Something went wrong");
        }
      });
    } else {
      this.message = "Signup not completed please entry valid data";
      this.user_name = this.signupForm.value?.firstName || '';
    }

    this.isSubmitted = true;
    console.log(this.signupForm.value);

    // code for toast
    const toastLiveExample = document.getElementById('liveToast')
    if (this.message) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
    }
  }

}
