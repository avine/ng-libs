import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IfNonNullishModule } from '@avine/ng-if-non-nullish';

import { IfNonNullishComponent } from './if-non-nullish.component';

describe('IfNonNullishComponent', () => {
  let component: IfNonNullishComponent;
  let fixture: ComponentFixture<IfNonNullishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IfNonNullishComponent],
      imports: [IfNonNullishModule],
    }).compileComponents();
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
