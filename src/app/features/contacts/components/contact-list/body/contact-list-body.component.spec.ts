import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListBodyComponent } from './contact-list-body.component';

describe('ContactListBodyComponent', () => {
  let component: ContactListBodyComponent;
  let fixture: ComponentFixture<ContactListBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
