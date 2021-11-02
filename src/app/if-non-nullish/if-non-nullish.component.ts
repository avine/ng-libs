import { interval, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-if-non-nullish',
  templateUrl: './if-non-nullish.component.html',
  styleUrls: ['./if-non-nullish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IfNonNullishComponent {
  data!: string | null;
  
  dataIndex = 0;
  
  defaultValue!: string | null;

  defaultValueIndex = 0;

  fallbackTemplate!: TemplateRef<any> | null;

  @ViewChild('fallbackTemplateA') fallbackTemplateA!: TemplateRef<any>;
  @ViewChild('fallbackTemplateB') fallbackTemplateB!: TemplateRef<any>;
  
  setData() {
    this.data = 'Data ' + ++this.dataIndex;
  }

  unsetData() {
    this.data = null;
  }

  setDefaultValue() {
    this.defaultValue = 'Default value ' + ++this.defaultValueIndex;
  }

  unsetDefaultValue() {
    this.defaultValue = null;
  }

  setFallbackTemplate() {
    if (this.fallbackTemplate === this.fallbackTemplateA) {
      this.fallbackTemplate = this.fallbackTemplateB;
    } else {
      this.fallbackTemplate = this.fallbackTemplateA;
    }
  }

  unsetFallbackTemplate() {
    this.fallbackTemplate = null;
  }
}
