import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContact } from '../../../models/contacts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactListToggleComponent } from "../toggle/contact-list-toggle.component";
import { ILayout } from '../../../models/layouts';
import { LayoutService } from '../../../services/layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-list-body',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ContactListToggleComponent],
  templateUrl: './contact-list-body.component.html',
  styleUrl: './contact-list-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListBodyComponent implements OnInit {
  @Input() contacts: IContact[] | null = [];

  @Output() onDelete = new EventEmitter<IContact>();

  @Output() onSelection = new EventEmitter<Set<string>>();

  selectedContactIds = new Set<string>();
  layout$!: Observable<ILayout>;

  faTrash = faTrash;
  faPhone = faPhone;

  constructor(private router: Router, private layoutService: LayoutService) {}

  ngOnInit() {
    this.layout$ = this.layoutService.layout$;
  }

  viewContact(contact: IContact) {
    // only open fully updated contacts.
    if (contact.isSubmitting) {
      return;
    }
    this.router.navigate(['contacts', contact.id]);
  }

  toggleContactSelection(contact: IContact) {
    if (!contact.id || contact.isSubmitting) {
      return; // we dont want to select a contact without an id or one that is not done being saved.
    }

    if (this.selectedContactIds.has(contact.id)) {
      this.selectedContactIds.delete(contact.id);
    } else {
      this.selectedContactIds.add(contact.id);
    }

    this.onSelection.emit(this.selectedContactIds);
  }

  toggleSelectAll() {
    if (this.selectedContactIds.size === this.contacts?.length) {
      this.selectedContactIds = new Set();
    } else {
      this.selectedContactIds = new Set(
        // get all ids from contacts, if the contact has an id (contacts still being submitted to the backend have no ids.)
        this.contacts?.reduce((ids: string[], contact) => {
          if (contact.id) ids.push(contact.id);
          return ids;
        }, [])
      );
    }

    this.onSelection.emit(this.selectedContactIds);
  }

  changeLayout(layout: ILayout) {
    this.layoutService.setLayout(layout);
  }

  handleDelete(contact: IContact) {
    const confirmDelete = window.confirm('Are you sure you would like to delete the contact?');
    if (confirmDelete) {
      this.onDelete.emit(contact);
    }
  }
}
