import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password || password.length < 6) {
        return null;
    }

    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    return hasNumber && hasSpecialChar && hasUpperCase && hasLowerCase ? null : { 'passwordValidator': true };

}