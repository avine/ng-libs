import { Component } from '@angular/core';
import { createDirectiveFactory } from '@ngneat/spectator/jest';

import { IfNonNullishDirective } from './if-non-nullish.directive';

@Component({})
class HostComponent {
  regular!: any;
  default!: any;
}

describe('DirectiveProviderDirective', () => {
  const createDirective = createDirectiveFactory({
    directive: IfNonNullishDirective,
    host: HostComponent,
  });

  it('should get the instance', () => {
    const spectator = createDirective('<div *ifNonNullish></div>');
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });

  describe('Regular value', () => {
    it('should not render host when no data provided', () => {
      const spectator = createDirective('<div *ifNonNullish></div>');
      expect(spectator.query('div')).toBeNull();
    });

    it.each([null, undefined])('should not render host when data is nullish like %p', (data) => {
      const spectator = createDirective('<div *ifNonNullish="regular"></div>', {
        hostProps: { regular: data },
      });
      expect(spectator.query('div')).toBeNull();
    });

    it.each([false, '', 0])('should render host when data is not nullish like %p', (data) => {
      const spectator = createDirective('<div *ifNonNullish="regular">Regular</div>', {
        hostProps: { regular: data },
      });
      expect(spectator.query('div')?.textContent).toMatch('Regular');
    });

    it('should expose data using "as" syntax', () => {
      const spectator = createDirective('<div *ifNonNullish="regular as value">{{ value }}</div>', {
        hostProps: { regular: 'Regular' },
      });
      expect(spectator.query('div')?.textContent).toMatch('Regular');
    });

    it('should expose data using implicit syntax', () => {
      const spectator = createDirective('<div *ifNonNullish="regular; let value">{{ value }}</div>', {
        hostProps: { regular: 'Regular' },
      });
      expect(spectator.query('div')?.textContent).toMatch('Regular');
    });
  });

  describe('Default value', () => {
    it('should render default value when regular value is nullish', () => {
      const spectator = createDirective('<div *ifNonNullish="regular as value; default:default">{{ value }}</div>', {
        hostProps: { regular: null, default: 'Default' },
      });
      expect(spectator.query('div')?.textContent).toMatch('Default');
    });

    it('should render regular value over default value', () => {
      const spectator = createDirective('<div *ifNonNullish="regular as value; default:default">{{ value }}</div>', {
        hostProps: { regular: 'Regular', default: 'Default' },
      });
      expect(spectator.query('div')?.textContent).toMatch('Regular');
    });
  });

  describe('Fallback template', () => {
    it('should render fallback template when regular and default values are nullish', () => {
      const spectator = createDirective(
        `
        <div *ifNonNullish="regular as value; default:default fallback:fallback">{{ value }}</div>
        <ng-template #fallback><i>Fallback</i></ng-template>
      `,
        { hostProps: { regular: null, default: null } }
      );
      expect(spectator.query('i')?.textContent).toMatch('Fallback');
    });

    it('should not render fallback template when regular value is not nullish', () => {
      const spectator = createDirective(
        `
        <div *ifNonNullish="regular as value; default:default fallback:fallback">{{ value }}</div>
        <ng-template #fallback><i>Fallback</i></ng-template>
      `,
        { hostProps: { regular: 'Regular', default: null } }
      );
      expect(spectator.query('div')?.textContent).toMatch('Regular');
    });

    it('should not render fallback template when default value is not nullish', () => {
      const spectator = createDirective(
        `
        <div *ifNonNullish="regular as value; default:default fallback:fallback">{{ value }}</div>
        <ng-template #fallback><i>Fallback</i></ng-template>
      `,
        { hostProps: { regular: null, default: 'Default' } }
      );
      expect(spectator.query('div')?.textContent).toMatch('Default');
    });
  });
});
