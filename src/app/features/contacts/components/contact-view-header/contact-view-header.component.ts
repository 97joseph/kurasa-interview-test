import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-view-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './contact-view-header.component.html',
  styleUrl: './contact-view-header.component.scss'
})
export class ContactViewHeaderComponent {
  @Input() title: string = '';

  faArrowLeft = faArrowLeft;
}
