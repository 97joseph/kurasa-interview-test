import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListToggleComponent } from './contact-list-toggle.component';

describe('ContactListToggleComponent', () => {
  let component: ContactListToggleComponent;
  let fixture: ComponentFixture<ContactListToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
