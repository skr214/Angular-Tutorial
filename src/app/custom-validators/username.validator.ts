import { AbstractControl, ValidationErrors } from "@angular/forms";

export function usernameValidator(control: AbstractControl): ValidationErrors | null {
    const username = control.value;

    if (!username || username.length < 5) {
        return null;
    }

    const hasNumber = /\d/.test(username);
    const hasUpperCase = /[A-Z]/.test(username);
    const hasLowerCase = /[a-z]/.test(username);

    return hasNumber && hasUpperCase && hasLowerCase ? null : { 'usernameValidator': true };

}