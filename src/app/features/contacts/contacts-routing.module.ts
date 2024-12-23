import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-contact/add-contact.component').then(
        (c) => c.AddContactComponent
      ),
      pathMatch: 'full'
  },
  {
    path: ':contactId',
    loadComponent: () =>
      import('./components/contact-view/contact-view.component').then(
        (c) => c.ContactViewComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
