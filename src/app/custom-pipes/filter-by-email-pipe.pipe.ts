import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByEmail',
  standalone: true
})
export class FilterByEmailPipe implements PipeTransform {
  transform(users: any[], email: string): any[] {
    if (!users || !email) return users;
    return users.filter(user =>
      user.email.toLowerCase().includes(email.toLowerCase())
    );
  }
}
