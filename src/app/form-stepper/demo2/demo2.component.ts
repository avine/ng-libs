import { Subscription } from 'rxjs';

import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormStepperContainerComponent, quicknavValueListToHtml } from '@avine/ng-form-stepper';
import {
  faAt,
  faCheck,
  faComment,
  faEye,
  faHeart,
  faIndustry,
  faInfo,
  faQuestion,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss'],
})
export class Demo2Component implements OnInit, OnDestroy {
  @ViewChild(FormStepperContainerComponent) formStepper!: FormStepperContainerComponent;

  hobbiesCtrl = this.formBuilder.array([['', Validators.required]]);

  contactCtrl = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
    }),
  });

  companyCtrl = this.formBuilder.group({
    name: ['', Validators.required],
    activity: ['', Validators.required],
  });

  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
    haveCompany: [false, Validators.required],
    message: [''],
  });

  haveCompanyCtrl = this.formGroup.controls.haveCompany;

  quicknavFormatter = (path: string, value: any): string | void => {
    if (path === 'hobbies') {
      return quicknavValueListToHtml(value as string[], undefined, false);
    }
    if (path === 'message') {
      return value || 'None';
    }
  };

  isBeingSubmitted = false;

  private subscription!: Subscription;

  faAt = faAt;
  faCheck = faCheck;
  faComment = faComment;
  faEye = faEye;
  faHeart = faHeart;
  faIndustry = faIndustry;
  faInfo = faInfo;
  faQuestion = faQuestion;
  faUser = faUser;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.handleHaveCompanyChange();
    this.subscription = this.formGroup.controls.haveCompany.valueChanges.subscribe(() => {
      this.handleHaveCompanyChange();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  handleHaveCompanyChange() {
    if (this.formGroup.controls.haveCompany.value) {
      this.formGroup.addControl('company', this.companyCtrl);
      this.formGroup.removeControl('contact');
      this.formGroup.removeControl('hobbies');
      this.formGroup.updateValueAndValidity();
    } else {
      this.formGroup.removeControl('company');
      this.formGroup.addControl('contact', this.contactCtrl);
      this.formGroup.addControl('hobbies', this.hobbiesCtrl);
      this.formGroup.updateValueAndValidity();
    }
  }

  addHobbyCtrl() {
    this.hobbiesCtrl.push(new FormControl(''));
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    const { stepIndex, lastStepIndex } = this.formStepper.stateSnapshot();
    if (stepIndex !== lastStepIndex) {
      return;
    }

    console.log('formGroup.value', JSON.stringify(this.formGroup.value, undefined, 2));

    this.isBeingSubmitted = true;

    // Emulate that we are submitting the form to the backend during 2 sec.
    setTimeout(() => {
      this.isBeingSubmitted = false;
    }, 2000);
  }
}
