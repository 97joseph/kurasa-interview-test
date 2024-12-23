import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { parsePhoneNumberFromString, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

export function phoneNumberValidator(defaultCountry: CountryCode = 'KE'): ValidatorFn {
  return (control: AbstractControl):ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    try {
      const phoneNumber = parsePhoneNumberFromString(value, defaultCountry);
      if (phoneNumber && isValidPhoneNumber(value, defaultCountry)) {
        return null;
      }
    } catch(e) {}

    return { invalidPhoneNumber: true }
  }
}
