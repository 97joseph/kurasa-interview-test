import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-phonebook';

  faAddressBook = faAddressBook;

  constructor(private fortLibrary: FaIconLibrary) {
    this.fortLibrary.addIcons(faAddressBook);
  }
}
