import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Router } from '@angular/router';
import { IContact } from '../../models/contacts';
import { ContactService } from '../../services/contact.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { ContactViewHeaderComponent } from '../contact-view-header/contact-view-header.component';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ContactViewHeaderComponent, ContactFormComponent],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddContactComponent implements OnInit, OnDestroy {
  private submittingSubscription?: Subscription;

  isSubmitting: boolean = false;
  resetForm$: Subject<any> = new Subject();
  
  faArrowLeft = faArrowLeft;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.submittingSubscription = this.contactService.isSubmitting$.subscribe((submitting) => {
      this.isSubmitting = submitting;

      if (!submitting) {
        this.router.navigate(['/contacts']);
      }
    });
  }

  addContact(contact: IContact) {
    this.contactService.addContact(contact);
  }

  ngOnDestroy() {
    this.submittingSubscription?.unsubscribe();
  }
}
