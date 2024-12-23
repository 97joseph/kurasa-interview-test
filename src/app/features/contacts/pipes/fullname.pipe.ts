import { Pipe, PipeTransform } from '@angular/core';
import { IContact } from '../models/contacts';

@Pipe({
  name: 'fullname',
  standalone: true
})
export class FullnamePipe implements PipeTransform {

  transform(contact: IContact | undefined | null): string {
    if (!contact) {
      return '';
    }
    return `${contact.firstName} ${contact.lastName}`;
  }
}
