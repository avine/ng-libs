# FormStepper

Advanced multi-step form that plays well with Angular ReactiveFormsModule.

## Demo

Check out the [demo](https://avine.github.io/ng-libs/form-stepper/demo/onboarding) and the demo [source code](https://github.com/avine/ng-libs/blob/main/src/app/form-stepper/demo/demo.component.html) for detailed explanations.

## Tutorial

Create a new Angular app with routing and Sass style options:

```bash
ng new my-app --routing --style scss
```

Install Angular CDK:

```bash
ng add @angular/cdk
```

Install the FormStepper library:

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
    FormStepperModule.config({ breakpoint: '960px' }),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

The `config()` method is just a convenient way to provide the `FORM_STEPPER_CONFIG` injection token with the given configuration.

Import the CDK Overlays styles in your `style.scss`:

```scss
@import '@angular/cdk/overlay-prebuilt.css';
```

Learn more about the [CDK Overlays](https://material.angular.io/cdk/overlay/overview).

Import the FormStepper styles in your `style.scss`:

```scss
@use '~@avine/ng-form-stepper/src/lib/scss/form-stepper.scss' with (
  $breakpoint: 960px
);
```

Create a new component:

```bash
ng generate component stepper
```

Update the routing in `app-routing.module.ts` to add navigation to the `StepperComponent`:

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

The route parameter `:${FORM_STEPPER_PATH_PARAM}` is required by the FormStepper library to navigate between steps.

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

Use the `<form-stepper-container>` component to declare the FormStepper in `stepper.component.html`:

```html
<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
  <!--
    `FormStepperContainerComponent` is the stepper root component.

    `fsFormGroupRoot` input is required and allows the FormStepper to determine when a step, a section or the entire form is valid.
  -->
  <form-stepper-container [fsFormGroupRoot]="formGroup" #formStepper>
    <!--
      `formStepperMain` directive is optional and allows you to customize the template of the current step.

      By default, the `formStepperStep` template is displayed as current step content.
      Therefore, you need to display the step title, the previous and next buttons directly in each step template.
    -->
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

    <!--
      `formStepperOnboarding` is optional and displays a static page as first step (can not contain any form field).
    -->
    <ng-template formStepperOnboarding fsTitle="Onboarding" fsPath="onboarding">
      <p>Welcome to Form Stepper.</p>
    </ng-template>

    <!--
      The `formStepperSection` directive adds a section to the stepper.
      A section groups together a bunch of steps.
    -->
    <ng-container formGroupName="fullName" formStepperSection fsTitle="Full name">
      <!--
        The `formStepperStep` directive adds a step to the stepper.
        Steps must be nested within sections.
        Finally, it is in the step that you define the form field controls.
      -->
      <ng-template formStepperStep="firstName" fsTitle="First name" fsPath="first-name">
        <input formControlName="firstName" formStepperControl />
      </ng-template>

      <ng-template formStepperStep="lastName" fsTitle="Last name" fsPath="last-name">
        <input formControlName="lastName" formStepperControl />
      </ng-template>
    </ng-container>

    <ng-container formStepperSection="email" fsTitle="Email">
      <ng-template formStepperStep fsPath="email">
        <input formControlName="email" formStepperControl />
      </ng-template>
    </ng-container>

    <!--
      `formStepperSummary` is optional and displays a static page as last step (can not contain any form field).
    -->
    <ng-template formStepperSummary fsTitle="Summary" fsPath="summary">
      <!--
        The quicknav displays a summary of the form value.
      -->
      <form-stepper-quicknav></form-stepper-quicknav>
    </ng-template>
  </form-stepper-container>
</form>

<pre>Form {{ formGroup.value | json }}</pre>
```

## How it works?

The FormStepper is made of steps, and steps are grouped into sections.

Each step contains one or more form controls.

The structure of the `FormGroup` you define in your component should reflect the structure of the FormStepper you want to achieve.

- In the example above, we want the FormStepper to have 2 sections: `fullName` and `email`.
- Next, we want the first section to have 2 steps: `firstName` and `lastName`.
- Finally, we want the second section to have one step: `email`.

```ts
class StepperComponent {
  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
    email: ['', [Validators.required, Validators.email]],
  });
}
```

Now we can bind the `FormGroup` to the FormStepper in the HTML template like this:

```html
<form-stepper-container [fsFormGroupRoot]="formGroup">
  <ng-container formStepperSection="fullName">
    <ng-template formStepperStep="firstName">...</ng-template>
    <ng-template formStepperStep="lastName">...</ng-template>
  </ng-container>

  <ng-container formStepperSection="email">
    <ng-template formStepperStep>...</ng-template>
  </ng-container>
</form-stepper-container>
```

## License

[MIT](https://github.com/avine/ng-libs/blob/main/LICENSE)
