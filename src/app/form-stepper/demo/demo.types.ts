import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface DemoForm {
  fullName: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
  }>;
  haveCompany: FormControl<boolean | null>;
  message: FormControl<string>;
  company?: FormGroup<{
    name: FormControl<string>;
    activity: FormControl<string>;
  }>;
  hobbies?: FormArray<FormControl<string>>;
  contact?: FormGroup<{
    email: FormControl<string>;
    address: FormGroup<{
      street: FormControl<string>;
      zipCode: FormControl<string>;
    }>;
  }>;
}
