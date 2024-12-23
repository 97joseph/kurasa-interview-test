import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { IContact } from '../../models/contacts';
import { Observable, Subscription } from 'rxjs';
import { ContactFormComponent } from '../contact-form/contact-form.component';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ContactViewHeaderComponent } from '../contact-view-header/contact-view-header.component';
import { FullnamePipe } from '../../pipes/fullname.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [CommonModule, ContactViewHeaderComponent, ContactFormComponent, FullnamePipe],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactViewComponent implements OnInit {
  private contactId?: string | null;
  private contactSubscription?: Subscription;
  private submittingSubscription?: Subscription;
  private routeParamsSubscription?: Subscription;

  contact?: IContact;
  isSubmitting!: boolean;

  faArrowLeft = faArrowLeft;

  constructor(private route: ActivatedRoute, private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.paramMap.subscribe((params) => {
      this.contactId = params.get('contactId');
      this.getContact();
    });

    this.submittingSubscription = this.contactService.isSubmitting$.subscribe((submitting) => {
      this.isSubmitting = submitting;

      if (!submitting) {
        this.router.navigate(['/contacts']);
      }
    });
  }

  getContact() {
    if (!this.contactId) {
      return;
    }

    this.contactSubscription = this.contactService.getContact(this.contactId).subscribe((contact: IContact) => {
      this.contact = contact;
    });
  }

  updateContact(contact: IContact) {
    this.contactService.updateContact({...this.contact, ...contact});
  }

  ngOnDestroy() {
    this.contactSubscription?.unsubscribe();
    this.submittingSubscription?.unsubscribe();
    this.routeParamsSubscription?.unsubscribe();
  }
}
