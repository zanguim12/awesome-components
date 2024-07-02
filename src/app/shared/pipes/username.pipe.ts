import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username',
  standalone: true
})
export class UsernamePipe implements PipeTransform {
  transform(user: { firstName: string; lastName: string }): string {
    if (!user || !user.firstName || !user.lastName) {
      return ''; // ou toute autre valeur par défaut appropriée
    }
    return `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`;
  }
}
