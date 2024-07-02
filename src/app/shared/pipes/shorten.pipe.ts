import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, length: number): string {
    if (!value || typeof value !== 'string') {
      return '';
    }
    if (value.length > length) {
      return value.substr(0, length) + '...';
    }
    return value;
  }
}
