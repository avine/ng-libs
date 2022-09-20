import { tap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FORM_STEPPER_DIRECTIVES } from '@avine/ng-form-stepper';

import { ViewSourceComponent } from '../../shared/view-source/view-source.component';

const materialModules = [MatButtonModule, MatCheckboxModule, MatInputModule] as const;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...materialModules, ViewSourceComponent, ...FORM_STEPPER_DIRECTIVES],
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
})
export class MaterialComponent {
  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      haveNickName: [false],
      nickName: [''],
    }),
    email: ['', [Validators.required, Validators.email]],
    cgu: ['', [Validators.requiredTrue]],
  });

  haveNickName$ = this.formGroup.controls.fullName.controls.haveNickName.valueChanges.pipe(
    tap((haveNickName) => {
      const nickName = this.formGroup.controls.fullName.controls.nickName;
      nickName.setValidators(haveNickName ? [Validators.required] : []);
      nickName.updateValueAndValidity();
    })
  );

  isBeingSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.isBeingSubmitted = true;

    console.log('FormStepper -> onSubmit', this.formGroup.value);

    setTimeout(() => {
      this.isBeingSubmitted = false;
    }, 1000);
  }
}
