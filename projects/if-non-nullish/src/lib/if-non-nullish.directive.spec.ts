import { Component } from '@angular/core';
import { createDirectiveFactory } from '@ngneat/spectator/jest';

import { IfNonNullishDirective } from './if-non-nullish.directive';

@Component({})
class HostComponent {
  data!: any;
  default!: any;
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

  describe('With value', () => {
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

  describe('With default value', () => {
    it('should render default value when value is nullish', () => {
      const spectator = createDirective('<div *ifNonNullish="data as value; default:default">{{ value }}</div>', {
        hostProps: { data: null, default: 'Default' },
      });
      expect(spectator.query('div')?.textContent).toMatch('Default');
    });

    it('should render value over default value', () => {
      const spectator = createDirective('<div *ifNonNullish="data as value; default:default">{{ value }}</div>', {
        hostProps: { data: 'Data', default: 'Default' },
      });
      expect(spectator.query('div')?.textContent).toMatch('Data');
    });
  });

  describe('With fallback template', () => {
    it('should render fallback template when value and default values are nullish', () => {
      const spectator = createDirective(
        `
        <div *ifNonNullish="data as value; default:default fallback:fallback">{{ value }}</div>
        <ng-template #fallback><i>Fallback</i></ng-template>
      `,
        { hostProps: { data: null, default: null } }
      );
      expect(spectator.query('i')?.textContent).toMatch('Fallback');
    });

    it('should not render fallback template when value is not nullish', () => {
      const spectator = createDirective(
        `
        <div *ifNonNullish="data as value; default:default fallback:fallback">{{ value }}</div>
        <ng-template #fallback><i>Fallback</i></ng-template>
      `,
        { hostProps: { data: 'Data', default: null } }
      );
      expect(spectator.query('div')?.textContent).toMatch('Data');
    });

    it('should not render fallback template when default value is not nullish', () => {
      const spectator = createDirective(
        `
        <div *ifNonNullish="data as value; default:default fallback:fallback">{{ value }}</div>
        <ng-template #fallback><i>Fallback</i></ng-template>
      `,
        { hostProps: { data: null, default: 'Default' } }
      );
      expect(spectator.query('div')?.textContent).toMatch('Default');
    });
  });
});
