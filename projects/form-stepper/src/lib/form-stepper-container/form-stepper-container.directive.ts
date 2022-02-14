import { filter, tap } from 'rxjs/operators';

import { AfterViewInit, ChangeDetectorRef, Directive } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { FORM_STEPPER_LINK } from '../form-stepper.config';
import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperContainer]',
  providers: [FormStepperService],
  exportAs: 'stepper',
})
export class FormStepperContainerDirective implements AfterViewInit {
  stepTemplate$ = this.service.stepTemplate$;

  isStepValid$ = this.service.isStepValid$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  constructor(
    private service: FormStepperService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      paramMap.get(FORM_STEPPER_LINK);
    });

    setTimeout(() => {
      this.service.setStepIndex(0);
      this.changeDetectorRef.detectChanges();
    }, 0);

    console.log(this.service)
    // this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd),);
  }
}
