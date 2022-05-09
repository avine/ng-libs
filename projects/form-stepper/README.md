# FormStepper

Advanced multi-step form that plays well with ReactiveFormModule.

## Tutorial

Create a new Angular app with routing and Sass support:

```bash
ng new my-app --routing --style scss
```

Install Angular CDK:

```bash
ng add @angular/cdk
```

Install the `FormStepper` library:

```bash
npm install @avine/ng-form-stepper
```

Import `BrowserAnimationsModule`, `ReactiveFormsModule` and `FormStepperModule` in your `app.module.ts`:

```ts
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormStepperModule } from '@avine/ng-form-stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormStepperModule.config({ breakpoint: '960px' }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

The `config()` method is just a convenient way to provide the `FORM_STEPPER_CONFIG` injection token with the default configuration.

Import the CDK Overlays styles in your `style.scss`:

```scss
@import '@angular/cdk/overlay-prebuilt.css';
```

Learn more about the [CDK Overlays](https://material.angular.io/cdk/overlay/overview).

Import the `FormStepper` styles in your `style.scss`:

```scss
@use 'node_modules/@avine/ng-form-stepper/src/lib/scss/form-stepper.scss' with (
  $breakpoint: 960px
);
```

Create a new component:

```bash
ng generate component stepper
```

Update routing in `app-routing.module.ts` to navigate to the `StepperComponent`:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORM_STEPPER_PATH_PARAM } from '@avine/ng-form-stepper';

import { StepperComponent } from './stepper/stepper.component';

const routes: Routes = [
  {
    path: `stepper/:${FORM_STEPPER_PATH_PARAM}`,
    component: StepperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Use the `FormBuilder` to create the form structure in `stepper.component.ts`:

```ts
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
    email: ['', [Validators.required, Validators.email]],
  });

  isBeingSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    this.isBeingSubmitted = true;

    console.log('FormStepper -> onSubmit', this.formGroup.value);

    setTimeout(() => (this.isBeingSubmitted = false), 1000); // Simulate backend request...
  }
}
```

Implement the `FormStepper` in `stepper.component.html`:

```html
<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
  <form-stepper-container [formStepperGroupRoot]="formGroup" #formStepper>
    <ng-template formStepperMain>
      <ng-container *ngIf="formStepper.main$ | async as main">
        <h2>{{ main.stepTitle }}</h2>

        <div>
          <ng-container [ngTemplateOutlet]="main.stepTemplate"></ng-container>
        </div>

        <button *ngIf="!main.isFirstStep" type="button" tabindex="-1" formStepperPrev>Previous</button>

        <button *ngIf="!main.isLastStep; else submitButton" type="button" tabindex="-1" formStepperNext>
          {{ main.isOnboarding ? 'Start' : 'Next' }}
        </button>

        <ng-template #submitButton>
          <button type="submit" [disabled]="formGroup.invalid || isBeingSubmitted">Submit</button>
        </ng-template>
      </ng-container>
    </ng-template>

    <ng-template formStepperOnboarding formStepperTitle="Onboarding" formStepperPath="onboarding">
      <p>Welcome to Form Stepper.</p>
    </ng-template>

    <ng-container formGroupName="fullName" formStepperSection formStepperTitle="Full name">
      <ng-template formStepperStep="firstName" formStepperPath="first-name">
        <input formControlName="firstName" formStepperControl />
      </ng-template>

      <ng-template formStepperStep="lastName" formStepperPath="last-name">
        <input formControlName="lastName" formStepperControl />
      </ng-template>
    </ng-container>

    <ng-container formStepperSection="email" formStepperTitle="Email">
      <ng-template formStepperStep formStepperPath="email">
        <input formControlName="email" formStepperControl />
      </ng-template>
    </ng-container>

    <ng-template formStepperSummary formStepperTitle="Summary" formStepperPath="summary">
      <form-stepper-quicknav></form-stepper-quicknav>
    </ng-template>
  </form-stepper-container>
</form>

<pre>Form {{ formGroup.value | json }}</pre>
```

## Demo

Check out [demo here](https://avine.github.io/ng-libs/form-stepper/demo/onboarding)

## License

[MIT](https://github.com/avine/ng-libs/blob/main/LICENSE)
