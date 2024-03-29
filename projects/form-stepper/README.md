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

Import `BrowserAnimationsModule`, `ReactiveFormsModule` and `FORM_STEPPER_DIRECTIVES` in your `app.module.ts`:

You also need to provide the injection token `FORM_STEPPER_CONFIG`. To , you can use the utility `provideFormStepperConfig`.

```ts
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORM_STEPPER_DIRECTIVES, provideFormStepperConfig } from '@avine/ng-form-stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, AppRoutingModule, ...FORM_STEPPER_DIRECTIVES],
  providers: [provideFormStepperConfig({ breakpoint: '960px' })],
  declarations: [AppComponent],
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
@use 'node_modules/@avine/ng-form-stepper/src/lib/scss/form-stepper.scss' with (
  $breakpoint: 960px
);
```

See below for Sass customization.

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

The `:${FORM_STEPPER_PATH_PARAM}` route parameter is required by the FormStepper library to identify the path when navigating between steps.

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
    console.log('FormStepper -> onSubmit', this.formGroup.value);

    this.isBeingSubmitted = true;
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
      The `formStepperMain` directive is optional and allows you to customize the current step template.
      To achieve this, use the `formStepper.main$` observable which exposes the details of the current step.

      Note: if the directive is not present, the `formStepperStep` template is displayed as the current step content.
      And therfore, you need to display the step title, the previous and next buttons directly in each step template.
    -->
    <ng-template formStepperMain>
      <ng-container *ngIf="formStepper.main$ | async as main">
        <h2>{{ main.stepTitle }}</h2>

        <div>
          <ng-container [ngTemplateOutlet]="main.stepTemplate"></ng-container>
        </div>

        <button *ngIf="!main.isFirstStep" type="button" formStepperPrev>Previous</button>

        <button *ngIf="!main.isLastStep; else submitButton" type="button" formStepperNext>
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
        <!--
          The `formStepperControl` directive adds smart behaviors to the `FormControl`:
            - autofocus the first `FormControl` of the step (when it has no value).
            - prevent form submission when pressing "Enter" key.
            - jump to the next step when pressing "Enter" key (if the current step is valid).
        -->
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

The structure of the `FormGroup` you define in your component should reflect the structure of the FormStepper you want to achieve:

- In the example above, we want the FormStepper to have 2 sections: `fullName` and `email`.
- Next, we want the first section to have 2 steps: `firstName` and `lastName`.
- Finally, we want the second section to have one step: `email`.

```ts
formGroup = this.formBuilder.group({
  fullName: this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  }),
  email: ['', [Validators.required, Validators.email]],
});
```

Now we can bind the `FormGroup` to the FormStepper in the HTML template:

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

Note:

- `formStepperSection` directive requires `fsTitle` input.
- `formStepperStep` directive requires `fsTitle` (if there's more than one step in the section) and `fsPath` inputs.

## API

### FormStepperContainerComponent

This is the FormStepper root component.

```html
<form-stepper-container [fsFormGroupRoot]="..."></form-stepper-container>
```

#### Inputs

| Input                       | Type         | Default   | Description                                                                                               |
| --------------------------- | ------------ | --------- | --------------------------------------------------------------------------------------------------------- |
| fsFormGroupRoot             | FormGroup    | undefined | Tracks the validity state of the `FormGroup` root (required).                                             |
| fsUseRouting                | BooleanInput | true      | Determines whether navigation between steps uses routing.                                                 |
| fsValidSectionIcon          | TemplateRef  | undefined | Template to use as section icon when all the steps in a section are valid.                                |
| fsNoScrollToTopOnNavigation | BooleanInput | false     | Determines whether to scroll to the top of the `<form-stepper-container>` element on navigation.          |
| fsNoOnboardingNav           | BooleanInput | false     | Determines whether to remove the link to the Onboarding step from the "nav".                              |
| fsNoStepsNav                | BooleanInput | false     | Determines whether to hide the steps in the "nav". When set to `true`, only the "sections" are displayed. |

#### Properties and methods

**`main$` and `mainSnapshot()`**

Get access to the current step infos from the component.

```ts
@Component({ ... })
class SomeComponent implements AfterViewInit {
  @ViewChild(FormStepperContainerComponent) formStepper!: FormStepperContainerComponent;

  ngAfterViewInit() {
    // Get an observable of the main infos needed to render the current step.
    this.formStepper.main$.subscribe((main: FormStepperMain) => { ... });
  }

  onSubmit() {
    // Get a snapshot of the main infos.
    const main: FormStepperMain = this.formStepper.mainSnapshot();

    // For example, you can ensure that a valid form can only be submitted when the user is in the last step.
    if (!main.isLastStep) {
      return;
    }
  }
}
```

Get access to the current step infos from the template.

```html
<form-stepper-container [fsFormGroupRoot]="formGroup" #formStepper>
  <ng-template formStepperMain>
    <ng-container *ngIf="formStepper.main$ | async as main">
      <h2>{{ main.stepTitle }}</h2>

      <div>
        <ng-container [ngTemplateOutlet]="main.stepTemplate"></ng-container>
      </div>

      <button *ngIf="!main.isFirstStep" type="button" formStepperPrev>Previous</button>

      <button *ngIf="!main.isLastStep; else submitButton" type="button" formStepperNext>
        {{ main.isOnboarding ? 'Start' : 'Next' }}
      </button>

      <ng-template #submitButton>
        <button type="submit" [disabled]="formGroup.invalid || isBeingSubmitted">Submit</button>
      </ng-template>
    </ng-container>
  </ng-template>
</form-stepper-container>
```

### FormStepperSectionDirective

The `AbstractControl` of the section (tracks the validity state of the section).

```html
<ng-container formStepperSection fsTitle="..."></ng-container>
```

#### Inputs

| Input              | Type                      | Default   | Description                                                                  |
| ------------------ | ------------------------- | --------- | ---------------------------------------------------------------------------- |
| formStepperSection | AbstractControl \| string | undefined | Tracks the validity state of the section (required).                         |
| formGroup          | AbstractControl           | undefined | When provided, the value of `formStepperSection` is optional.                |
| formGroupName      | string                    | undefined | When provided, the value of `formStepperSection` is optional.                |
| formArrayName      | string                    | undefined | When provided, the value of `formStepperSection` is optional.                |
| fsTitle            | string                    | undefined | The title of the step (required).                                            |
| fsIcon             | TemplateRef               | undefined | The icon template of the section to use in the the "nav" and the "quicknav". |
| fsNoQuicknav       | BooleanInput              | false     | Determines wheter to exclude the section from the "quicknav".                |
| noStepsNav         | BooleanInput              | undefined | Determines whether to hide the steps in the "nav" for a particular section.  |

```ts
interface FormStepperSectionOptions {
  title?: string;
  icon?: TemplateRef<any>;
  noQuicknav?: boolean;
  noStepsNav?: boolean;
}
```

### FormStepperStepDirective

The `AbstractControl` of the step (tracks the validity state of the step).

```html
<ng-template formStepperStep fsTitle="..." fsPath="..."></ng-template>
```

#### Inputs

| Input                   | Type                      | Default   | Description                                                                                        |
| ----------------------- | ------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| formStepperStep         | AbstractControl \| string | undefined | Tracks the validity state of the step (required).                                                  |
| formGroup               | AbstractControl           | undefined | When provided, the value of `formStepperStep` is optional.                                         |
| formGroupName           | string                    | undefined | When provided, the value of `formStepperStep` is optional.                                         |
| formArrayName           | string                    | undefined | When provided, the value of `formStepperStep` is optional.                                         |
| fsTitle                 | string                    | undefined | The title of the step (required, if there's more than one step in the section).                    |
| fsAutoNextOnValueChange | BooleanInput              | false     | Determines whether to go to the next step each time value changes (and the current step is valid). |
| fsPath                  | string                    | undefined | The route parameter to use to navigate to the step (required).                                     |

```ts
interface FormStepperStepOptions {
  title?: string;
  autoNextOnValueChange?: boolean;
  path: string;
}
```

### FormStepperControlDirective

Add smart behaviors to the `FormControl`:

- autofocus the first `FormControl` of the step (when it has no value).
- prevent form submission when pressing "Enter" key.
- jump to the next step when pressing "Enter" key (if the current step is valid).

Here's an example with an `input` field:

```html
<input formStepperControl />
```

#### Inputs

| Input     | Type                                     | Default   | Description                    |
| --------- | ---------------------------------------- | --------- | ------------------------------ |
| fsOnEnter | Partial&lt;FormStepperControlOnEnter&gt; | undefined | Adjust the directive behavior. |

For a `<textarea>` you probably want to configure the directive as follows:

```html
<textarea formStepperControl [fsEnter]="{ preventDefault: false, nextStep: false }"></textarea>
```

### FormStepperPrevDirective and FormStepperPrevAnchorDirective

Jump to the previous step on click event.

```html
<button formStepperPrev>Previous</button>
or
<a formStepperPrevAnchor>Previous</a>
```

#### Inputs

| Input      | Type   | Default   | Description                                                  |
| ---------- | ------ | --------- | ------------------------------------------------------------ |
| fsInactive | string | undefined | CSS class to add when the button should be mark as inactive. |

### FormStepperNextDirective

Jump to the next step on click event.

```html
<button formStepperNext>Next</button>
```

#### Inputs

| Input      | Type   | Default   | Description                                                  |
| ---------- | ------ | --------- | ------------------------------------------------------------ |
| fsInactive | string | undefined | CSS class to add when the button should be mark as inactive. |

### FormStepperOnboardingDirective and FormStepperSummaryDirective

Add a static step as first and/or last step (can not contain any `FormControl`).

```html
<ng-template formStepperOnboarding>...</ng-template>
and/or
<ng-template formStepperSummary>...</ng-template>
```

| Input   | Type        | Default   | Description                                                           |
| ------- | ----------- | --------- | --------------------------------------------------------------------- |
| fsTitle | string      | undefined | The title of the static step (required).                              |
| fsPath  | string      | undefined | The route parameter to use to navigate to the static step (required). |
| fsIcon  | TemplateRef | undefined | The icon template of the static step.                                 |

### FormStepperQuicknavComponent

Render the form value in a nice summary with links to jump back to any step.

```html
<form-stepper-quicknav></form-stepper-quicknav>
```

#### Inputs

| Input     | Type                                                | Default   | Description                                                 |
| --------- | --------------------------------------------------- | --------- | ----------------------------------------------------------- |
| fsCompact | BooleanInput                                        | false     | Determines whether to remove the sections from the summary. |
| fsFormat  | (path: string, controlValue: any) => string \| void | undefined | Customize the HTML output of any form field value.          |

Note: `fsCompact` input should be set to `true` when the FormStepper has only one level (each section has only one step).

### Sass customization

You can fully customize the FormStepper CSS using Sass.

Below the [list of Sass variables](https://github.com/avine/ng-libs/blob/main/projects/form-stepper/src/lib/scss/_variables.scss):

```scss
@use 'node_modules/@avine/ng-form-stepper/src/lib/scss/form-stepper.scss' with (
  $breakpoint: 1024px,

  // ----- prev -----
  $prev-anchor-disabled-color: #999999,

  // ----- nav -----
  $nav-bg-color: #ffffff,
  $nav-timeline-color: #e1e1e1,
  $nav-bullet-color: #e1e1e1,

  $nav-text-color__default: #636363,
  $nav-text-color__valid: #222222,

  $nav-valid__bg-color: #43a047,
  $nav-valid__text-color: #e8f5e9,

  $nav-section-current__bg-color: #00acc1,
  $nav-section-current__text-color: #e0f7fa,

  $nav-step__underline-color: #d1d1d1,

  $nav-mobile-steps__box-shadow: 0px 3px 6px -1px rgba(0, 0, 0, 0.15),
  $nav-mobile-steps__border-color: #cccccc,
  $nav-mobile-steps__bg-color: #ffffff,

  // ----- quicknav -----
  $quicknav-border-color: #eaeaea,
  $quicknav-bg-color: #f7f7f7,
  $quicknav-icon-bg-color: #e7e7e7
);
```

## License

[MIT](https://github.com/avine/ng-libs/blob/main/LICENSE)
