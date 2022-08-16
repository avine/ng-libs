import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteTemplateDirective, AutocompleteSuggestionDirective } from './autocomplete.directive';

const features = [AutocompleteComponent, AutocompleteTemplateDirective, AutocompleteSuggestionDirective];

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [features],
  exports: [features],
})
export class AutocompleteModule {}
