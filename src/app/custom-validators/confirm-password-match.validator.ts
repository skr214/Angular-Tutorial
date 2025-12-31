import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const group = formGroup as FormGroup;
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);

        if (!control || !matchingControl) return null;

        // Get existing errors
        const errors = matchingControl.errors || {};

        // Only set mustMatch error if both fields are filled
        if (control.value && matchingControl.value && control.value !== matchingControl.value) {
            errors['mustMatch'] = true;
        } else {
            delete errors['mustMatch'];
        }

        // If there are no errors left, set to null
        if (Object.keys(errors).length === 0) {
            matchingControl.setErrors(null);
        } else {
            matchingControl.setErrors(errors);
        }

        return null;
    };
}
