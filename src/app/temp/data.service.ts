import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { ContactFilterOptions, IContact } from '../features/contacts/models/contacts';

const contacts: IContact[] = [
  {
    "id": "48e45e4f-21cd-452d-b88c-b6e15ed9d125",
    "firstName": "Mwangi",
    "lastName": "Kamau",
    "email": "mwangi.kamau@example.com",
    "address": "P.O. Box 1234, Nairobi, Kenya",
    "favorite": false,
    "group": "work",
    "image": "https://placekitten.com/493/841",
    "lastViewed": new Date("2024-09-12 20:27:26"),
    "phone": "+254712345678",
    "deleted": false
  },
  {
    "id": "280b4251-bf99-42cb-92e3-6dcc9eb0da9a",
    "firstName": "Achieng",
    "lastName": "Otieno",
    "email": "achieng.otieno@example.com",
    "address": "P.O. Box 5678, Kisumu, Kenya",
    "favorite": false,
    "group": "family",
    "image": "https://placeimg.com/1009/958/any",
    "lastViewed": new Date("2024-04-05 09:50:43"),
    "phone": "+254798765432",
    "deleted": false
  },
  {
    "id": "f9ac45d7-843e-41d9-9816-6e4c7d9f2974",
    "firstName": "Wafula",
    "lastName": "Njoroge",
    "email": "wafula.njoroge@example.com",
    "address": "P.O. Box 4321, Eldoret, Kenya",
    "favorite": false,
    "group": "work",
    "image": "https://placekitten.com/31/976",
    "lastViewed": new Date("2024-02-06 01:18:33"),
    "phone": "+254723456789",
    "deleted": false
  },
  {
    "id": "407c658d-6d1d-4f39-babe-dec917d74454",
    "firstName": "Njeri",
    "lastName": "Mutua",
    "email": "njeri.mutua@example.com",
    "address": "P.O. Box 8765, Nakuru, Kenya",
    "favorite": true,
    "group": "others",
    "image": "https://placeimg.com/641/945/any",
    "lastViewed": new Date("2024-10-05 19:53:08"),
    "phone": "+254701234567",
    "deleted": false
  },
  {
    "id": "c353f5fc-4b61-4b72-8031-612f70b27483",
    "firstName": "Kiprono",
    "lastName": "Chebet",
    "email": "kiprono.chebet@example.com",
    "address": "P.O. Box 9101, Kericho, Kenya",
    "favorite": true,
    "group": "family",
    "image": "https://placekitten.com/652/959",
    "lastViewed": new Date("2024-11-12 06:55:25"),
    "phone": "+254712098765",
    "deleted": false
  },
  {
    "id": "3f9c45e9-9a65-4af6-95c6-9b1022c1b5b1",
    "firstName": "Fatuma",
    "lastName": "Hassan",
    "email": "fatuma.hassan@example.com",
    "address": "P.O. Box 1122, Mombasa, Kenya",
    "favorite": false,
    "group": "friends",
    "image": "https://placeimg.com/800/600/people",
    "lastViewed": new Date("2024-03-15 10:20:45"),
    "phone": "+254734567890",
    "deleted": false
  },
  {
    "id": "7a8d4e6f-4321-4d9b-84e5-75c7396a8baf",
    "firstName": "Kevin",
    "lastName": "Omondi",
    "email": "kevin.omondi@example.com",
    "address": "P.O. Box 3344, Kisii, Kenya",
    "favorite": true,
    "group": "work",
    "image": "https://placekitten.com/400/400",
    "lastViewed": new Date("2024-08-25 08:45:30"),
    "phone": "+254799876543",
    "deleted": false
  },
  {
    "id": "914c58f7-1d6e-4bf3-b7a1-d6c4d7c0a9e1",
    "firstName": "Linet",
    "lastName": "Wanjiru",
    "email": "linet.wanjiru@example.com",
    "address": "P.O. Box 5566, Nyeri, Kenya",
    "favorite": false,
    "group": "family",
    "image": "https://placeimg.com/500/500/nature",
    "lastViewed": new Date("2024-07-10 14:12:50"),
    "phone": "+254701112233",
    "deleted": false
  },
  {
    "id": "8b2f4a78-3c7d-4a5f-910e-2134b6d3d6f7",
    "firstName": "Samuel",
    "lastName": "Okoth",
    "email": "samuel.okoth@example.com",
    "address": "P.O. Box 7788, Nairobi, Kenya",
    "favorite": true,
    "group": "others",
    "image": "https://placekitten.com/450/550",
    "lastViewed": new Date("2024-11-20 11:00:00"),
    "phone": "+254733445566",
    "deleted": false
  },
  {
    "id": "6c8f7a9b-4a5f-9b0c-2d7e-5f8g1h9i2j3k",
    "firstName": "Grace",
    "lastName": "Nyaboke",
    "email": "grace.nyaboke@example.com",
    "address": "P.O. Box 9900, Thika, Kenya",
    "favorite": false,
    "group": "friends",
    "image": "https://placeimg.com/640/480/people",
    "lastViewed": new Date("2024-12-15 13:30:25"),
    "phone": "+254722334455",
    "deleted": false
  },
  {
    "id": "ab9f8e7c-1d2b-3c4d-5e6f-7g8h9i0j1k2l",
    "firstName": "John",
    "lastName": "Karanja",
    "email": "john.karanja@example.com",
    "address": "P.O. Box 2233, Machakos, Kenya",
    "favorite": true,
    "group": "work",
    "image": "https://placekitten.com/512/512",
    "lastViewed": new Date("2024-06-05 09:15:45"),
    "phone": "+254725667788",
    "deleted": false
  }
];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getContacts(filterOptions: ContactFilterOptions = {}): Observable<IContact[]> {
    const filterCallbacks = this.createFilters(filterOptions);
    return of(this.filterContacts([...contacts], filterCallbacks));
  }

  getContact(contactId: string): Observable<IContact> {
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      return throwError(() => ({ status: 404, message: 'Contact not found' }));
    }

    return of(contact);
  }

  addContact(contact: IContact): Observable<IContact> {
    contact['id'] = this.generateRandomId();
    contact['deleted'] = false;
    contact['lastViewed'] = new Date();
    contacts.push(contact);
    return of(contact);
  }

  updateContact(updatedContact: IContact): Observable<IContact> {
    const contactIndex = contacts.findIndex((contact) => contact.id === updatedContact.id);

    if (contactIndex === undefined) {
      return throwError(() => ({ status: 404, message: 'Contact not found' }));
    }
    contacts.splice(contactIndex, 1, updatedContact);
    return of(contacts[contactIndex]);
  }

  deleteContact(contactId: string): Observable<null> {
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return throwError(() => ({ status: 404, message: 'Contact not found' }));
    }

    contact['deleted'] = true;
    return of(null);
  }

  deleteContacts(contactIds: string[]): Observable<null> {
    contacts.forEach((contact) => {
      if (contact.id && contactIds.includes(contact.id)) {
        contact['deleted'] = true;
      }
    });

    return of(null);
  }

  private filterContacts(contacts: IContact[], filters: ContactFilter[]): IContact[] {
    return contacts.filter((contact) => {
      return filters.every((filter) => filter(contact));
    });
  }

  private createFilters(filterOptions: ContactFilterOptions = {}) {
    const filters: ContactFilter[] = [];

    if (filterOptions.searchTerm && filterOptions.searchTerm.trim()) {
      const lowerCaseSearchTerm = filterOptions.searchTerm.toLowerCase();
      filters.push((contact: IContact) =>
        contact.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        contact.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
        contact.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        contact.phone.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    if (filterOptions.showDeleted) {
      filters.push(() => true);
    } else {
      filters.push((contact: IContact) => !contact.deleted);
    }

    return filters;
  }

  private generateRandomId() {
    return (
      'id-' +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 10)
    );
  }
}

type ContactFilter = (contact: IContact) => boolean;
