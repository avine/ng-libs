import { of } from 'rxjs';

import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AutocompleteSuggestionsComponent } from '../autocomplete-suggestions.component';
import { AutocompleteSuggestionsViewComponent } from './autocomplete-suggestions-view.component';

describe('AutocompleteSuggestionsViewComponent', () => {
  let spectator: Spectator<AutocompleteSuggestionsViewComponent>;
  const createComponent = createComponentFactory(AutocompleteSuggestionsViewComponent);

  it('should create', () => {
    spectator = createComponent({
      props: {
        suggestionsComponent: {
          suggestions$: of<string[]>([]),
        } as AutocompleteSuggestionsComponent,
      },
    });

    expect(spectator.component).toBeTruthy();
  });
});
