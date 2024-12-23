import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IContact } from '../../models/contacts';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { CountryCode } from 'libphonenumber-js';
import { phoneNumberValidator } from 'src/app/shared/validators/phoneNumberValidator';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent implements OnInit, OnDestroy {
  
  @Input() isSubmitting: boolean = false;
  @Input() resetForm$: Observable<any> | null = null;
  // Populate the form fields based on the contact provided.
  @Input() set contact(value: IContact | undefined) {
    if (value) {
      this.form.patchValue({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        phone: value.phone,
        address: value.address,
        favorite: value.favorite,
        group: value.group,
      })
    }
  }

  @Output() onSubmit: EventEmitter<IContact> = new EventEmitter<IContact>();

  form: FormGroup;

  resetFormSubscription?: Subscription;

  // TODO: Make this a selection instead of hardcoding the country code.
  country: {name: string, code: CountryCode} = {name: 'Kenya', code: 'KE'};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, phoneNumberValidator(this.country.code)]],
      email: ['', [Validators.email]],
      address: [''],
      group: [''],
      favorite: [false],
    });
  }

  ngOnInit(): void {
    this.resetFormSubscription = this.resetForm$?.subscribe(() => {
      this.resetForm()
    });
  }

  handleSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      this.form.markAllAsTouched();
      return;
    }
    this.onSubmit.emit(this.form.value);
  }

  resetForm() {
    this.form.reset();
  }

  getControlClass(controlName: string): string {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched ? 'input-error' : '';
  }

  controlHasError(controlName: string, error?: string) {
    const control = this.form.get(controlName);
    // check if the control has error. if error is provided, then check for the specific error,
    // otherwise only check if it is invalid.
    return (
      control?.invalid &&
      control.touched &&
      (error ? control.hasError(error) : true)
    );
  }

  ngOnDestroy(): void {
    this.resetFormSubscription?.unsubscribe();
  }
}
