import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faList, faTableCells } from '@fortawesome/free-solid-svg-icons';
import { ILayout } from '../../../models/layouts';

@Component({
  selector: 'app-contact-list-toggle',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './contact-list-toggle.component.html',
  styleUrl: './contact-list-toggle.component.scss'
})
export class ContactListToggleComponent {
  @Input() layout: ILayout | null = 'list';

  @Output() onLayoutChange = new EventEmitter<ILayout>();

  faList = faList;
  faGrid = faTableCells;

  setLayout(layout: ILayout) {
    this.layout = layout;

    this.onLayoutChange.emit(layout);
  }
}
