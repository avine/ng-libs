import { of } from 'rxjs';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IfNonNullishDirective } from './if-non-nullish.directive';

@Component({
  template: `
    <div *ifNonNullish="true; let implicit" test-1>true is {{ implicit }} which is NonNullish</div>
    <div *ifNonNullish="false; let implicit" test-2>false is {{ implicit }} which is NonNullish</div>

    <div *ifNonNullish="true$ | async as value; let implicit" test-3>
      {{ value }} is {{ implicit }} which is NonNullish
    </div>
    <div *ifNonNullish="false$ | async as value; let implicit" test-4>
      {{ value }} is {{ implicit }} which is NonNullish
    </div>

    <div *ngIf="true" test-5>true is truthy</div>
    <div *ngIf="false" test-6>false is not truthy</div>

    <div *ifNonNullish="undefined" test-7>undefined is Nullish</div>
    <div *ifNonNullish="null" test-8>null is Nullish</div>
  `,
})
class TestComponent {
  true$ = of(true);
  false$ = of(false);
}

describe('IfNonNullishDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [IfNonNullishDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(queryTextContent('[test-1]')).toMatch('true is true which is NonNullish');
    expect(queryTextContent('[test-2]')).toMatch('false is false which is NonNullish');

    expect(queryTextContent('[test-3]')).toMatch('true is true which is NonNullish');
    expect(queryTextContent('[test-4]')).toMatch('false is false which is NonNullish');

    expect(queryTextContent('[test-5]')).toMatch('true is truthy');
    expect(queryTextContent('[test-6]')).toBeNull();

    expect(queryTextContent('[test-7]')).toBeNull();
    expect(queryTextContent('[test-8]')).toBeNull();
  });

  function queryTextContent(selctor: string) {
    return fixture.debugElement.query(By.css(selctor))?.nativeElement?.textContent || null;
  }
});
