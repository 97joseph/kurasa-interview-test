import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactViewHeaderComponent } from './contact-view-header.component';

describe('ContactViewHeaderComponent', () => {
  let component: ContactViewHeaderComponent;
  let fixture: ComponentFixture<ContactViewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactViewHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
