import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [JsonPipe, FormsModule, CommonModule],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss'
})
export class SignalComponent {

  newCity: string = '';
  newState: string = '';
  selectedState: string = 'NA';
  states: string[] = [];

  // Signals in Angular

  // signal is a new reactivity primitive in Angular that allows you to create reactive state in your applications.
  // Signals are similar to Observables but are designed to be simpler and more efficient for certain use cases.
  // Signals can be used to manage state in Angular applications, making it easier to build reactive user interfaces.   

  // Here is an example of how to create and use a signal in an Angular component:
  // Create a signal to hold a string value
  courseName = signal('Angular Tutorial');

  // You can also create signals for other data types, such as numbers, booleans, or even complex objects.
  courseDuration = signal<string>("6 weeks");

  cityList = signal<string[]>(['Patna', 'Ara', 'Buxar']);

  stateList = signal(['Bihar', 'UP', 'MP']);

  person = signal<{ name: string, age: number }>({ name: 'Monu', age: 25 });

  employeeObject = signal<any>({ firstName: '', middleName: '', lastName: '', empId: '', name: '', city: '', fullName: '', pinCode: '', state: '' });

  fName = signal('');
  mName = signal('');
  lName = signal('');

  fullName = computed(() => { // Create a computed signal that derives its value from other signals
    console.log(`${this.fName()} ${this.mName()} ${this.lName()}`);
    return `${this.fName()} ${this.mName()} ${this.lName()}`;
  });


  constructor() {
    const course_name = this.courseName(); // Access the value of the signal using the `()` operator
    console.log(course_name); // Output: Angular Tutorial
    this.states = this.stateList();
  }

  changeVariable() {
    this.courseName.set('React Tutorial'); // Override the existing value of the signal using the `set()` method
  }

  changeArray() {
    this.cityList.set(['Gya', 'Chhapra', 'Siwan']);
  }

  changeObject() {
    this.person.set({ name: 'Sonu', age: 29 });
  }

  addCity() {
    if (!this.cityList().includes(this.newState) && this.newCity.trim() !== '') {
      this.cityList.update(oldCities => [...oldCities, this.newCity]); // Update the existing value of the signal using the `update()` method
      this.newCity = '';
    }

  }

  addState() {
    if (!this.states.includes(this.newState) && this.newState.trim() !== '') {
      this.stateList.update(oldStates => [...oldStates, this.newState]);
      this.states = this.stateList();
      this.newState = '';
    }
  }

  changeFieldValue(field: string, event: any) {
    const value = event.target.value;
    this.employeeObject.update(emp => {
      return { ...emp, [field]: value };
    });
  }

  updateNameField(field: string, event: any) {
    const value = event.target.value;
    if (field === 'firstName') {
      this.fName.set(value);
      this.employeeObject.update(emp => {
        return { ...emp, [field]: value };
      });
    } else if (field === 'middleName') {
      this.mName.set(value);
      this.employeeObject.update(emp => {
        return { ...emp, [field]: value };
      });
    } else if (field === 'lastName') {
      this.lName.set(value);
      this.employeeObject.update(emp => {
        return { ...emp, [field]: value };
      });
    }
  }

}
