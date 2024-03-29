import { ReplaySubject } from 'rxjs';

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { createDirectiveFactory } from '@ngneat/spectator/jest';

import { IfNonNullishDirective } from './if-non-nullish.directive';

@Component({})
class HostComponent {
  data!: any;
  default!: any;

  @ViewChild('fallback1') fallback1!: TemplateRef<any> | null;
  @ViewChild('fallback2') fallback2!: TemplateRef<any> | null;
  fallback!: TemplateRef<any> | null;
}

describe('IfNonNullishDirective', () => {
  const createDirective = createDirectiveFactory({
    directive: IfNonNullishDirective,
    host: HostComponent,
  });

  it('should get the instance', () => {
    const spectator = createDirective('<div *ifNonNullish></div>');
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  describe('Using primitives', () => {
    describe('Rendering data', () => {
      it('should not render host when no data provided', () => {
        const spectator = createDirective('<div *ifNonNullish></div>');
        expect(spectator.query('div')).toBeNull();
      });

      it.each([null, undefined])('should not render host when data is nullish like %p', (data) => {
        const spectator = createDirective('<div *ifNonNullish="data"></div>', {
          hostProps: { data },
        });
        expect(spectator.query('div')).toBeNull();
      });

      it.each([false, '', 0])('should render host when data is not nullish like %p', (data) => {
        const spectator = createDirective('<div *ifNonNullish="data">Data</div>', {
          hostProps: { data },
        });
        expect(spectator.query('div')?.textContent).toMatch('Data');
      });

      it('should expose data using "as" syntax', () => {
        const spectator = createDirective('<div *ifNonNullish="data as value">{{ value }}</div>', {
          hostProps: { data: 'Data' },
        });
        expect(spectator.query('div')?.textContent).toMatch('Data');
      });

      it('should expose data using implicit syntax', () => {
        const spectator = createDirective('<div *ifNonNullish="data; let value">{{ value }}</div>', {
          hostProps: { data: 'Data' },
        });
        expect(spectator.query('div')?.textContent).toMatch('Data');
      });
    });

    describe('Rendering fallback template', () => {
      it('should render fallback template when data is nullish', () => {
        const spectator = createDirective(
          `
          <div *ifNonNullish="data as value; fallback: fallback">{{ value }}</div>
          <ng-template #fallback><i>Fallback</i></ng-template>
        `,
          { hostProps: { data: null } },
        );
        expect(spectator.query('i')?.textContent).toMatch('Fallback');
      });

      it('should render different fallback templates over time', () => {
        const spectator = createDirective(
          `
          <div *ifNonNullish="data as value; fallback: fallback">{{ value }}</div>
          <ng-template #fallback1><i>Fallback 1</i></ng-template>
          <ng-template #fallback2><i>Fallback 2</i></ng-template>
        `,
        );

        const hostComponent = spectator.hostComponent as HostComponent;

        hostComponent.fallback = hostComponent.fallback1;
        spectator.detectChanges();
        expect(spectator.query('i')?.textContent).toMatch('Fallback 1');

        hostComponent.fallback = hostComponent.fallback2;
        spectator.detectChanges();
        expect(spectator.query('i')?.textContent).toMatch('Fallback 2');
      });

      it('should clear view when fallback template becomes nullish', () => {
        const spectator = createDirective(
          `
            <div *ifNonNullish="data as value; fallback: fallback">{{ value }}</div>
            <ng-template #fallback1><i>Fallback 1</i></ng-template>
          `,
        );

        const hostComponent = spectator.hostComponent as HostComponent;

        hostComponent.fallback = hostComponent.fallback1;
        spectator.detectChanges();
        expect(spectator.query('i')?.textContent).toMatch('Fallback 1');

        hostComponent.fallback = null;
        spectator.detectChanges();
        expect(spectator.query('i')).toBeNull();
      });

      it('should not render fallback template when data is not nullish', () => {
        const spectator = createDirective(
          `
          <div *ifNonNullish="data as value; fallback: fallback">{{ value }}</div>
          <ng-template #fallback><i>Fallback</i></ng-template>
        `,
          { hostProps: { data: 'Data' } },
        );
        expect(spectator.query('div')?.textContent).toMatch('Data');
      });
    });
  });

  describe('Using Observables', () => {
    describe('Rendering data', () => {
      it('should render data over time', () => {
        const { data, next } = getMockData$<string | null>();
        const spectator = createDirective('<div *ifNonNullish="data | async as value">{{ value }}</div>', {
          hostProps: { data },
        });

        expect(spectator.query('div')).toBeNull();

        next('Data 1');
        spectator.detectChanges();
        expect(spectator.query('div')?.textContent).toMatch('Data 1');

        next('Data 2');
        spectator.detectChanges();
        expect(spectator.query('div')?.textContent).toMatch('Data 2');

        next(null);
        spectator.detectChanges();
        expect(spectator.query('div')).toBeNull();

        next('Data');
        spectator.detectChanges();
        expect(spectator.query('div')?.textContent).toMatch('Data');
      });
    });

    describe('Rendering fallback template', () => {
      it('should render fallback template starting with template', () => {
        const { data, next } = getMockData$<string | null>();
        const spectator = createDirective(
          `
            <div *ifNonNullish="data | async as value; fallback: fallback">{{ value }}</div>
            <ng-template #fallback><i>Fallback</i></ng-template>
          `,
          { hostProps: { data } },
        );
        expect(spectator.query('i')?.textContent).toMatch('Fallback');

        next('Data');
        spectator.detectChanges();
        expect(spectator.query('div')?.textContent).toMatch('Data');

        next(null);
        spectator.detectChanges();
        expect(spectator.query('i')?.textContent).toMatch('Fallback');
      });

      it('should render fallback template starting with data', () => {
        const { data, next } = getMockData$<string | null>('Data');
        const spectator = createDirective(
          `
            <div *ifNonNullish="data | async as value; fallback: fallback">{{ value }}</div>
            <ng-template #fallback><i>Fallback</i></ng-template>
          `,
          { hostProps: { data } },
        );
        expect(spectator.query('div')?.textContent).toMatch('Data');

        next(null);
        spectator.detectChanges();
        expect(spectator.query('i')?.textContent).toMatch('Fallback');

        next('Data');
        spectator.detectChanges();
        expect(spectator.query('div')?.textContent).toMatch('Data');
      });

      it('should not call createEmbeddedView for the template fallback when not necessary', () => {
        const { data, next } = getMockData$<'Data' | null | undefined>('Data');
        const spectator = createDirective(
          `
            <div *ifNonNullish="data | async as value; fallback: fallback">{{ value }}</div>
            <ng-template #fallback><i>Fallback</i></ng-template>
          `,
          { hostProps: { data } },
        );

        // Hack: accessing the private property `viewContainerRef` of the directive
        const createEmbeddedView = jest.spyOn((spectator.directive as any).viewContainerRef, 'createEmbeddedView');

        next(null);
        spectator.detectChanges();
        expect(spectator.query('i')?.textContent).toMatch('Fallback');

        next(undefined);
        spectator.detectChanges();
        expect(spectator.query('i')?.textContent).toMatch('Fallback');

        expect(createEmbeddedView).toHaveBeenCalledTimes(1);
      });
    });
  });
});

function getMockData$<T>(firstValue?: T) {
  const data = new ReplaySubject<T>(1);
  const next = (value: T) => data.next(value);
  if (firstValue) {
    next(firstValue);
  }
  return { data, next };
}
