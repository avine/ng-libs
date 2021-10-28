import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfNonNullishComponent } from './if-non-nullish.component';

describe('IfNonNullishComponent', () => {
  let component: IfNonNullishComponent;
  let fixture: ComponentFixture<IfNonNullishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfNonNullishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfNonNullishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
