import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ViewSourceComponent } from '../../shared/view-source/view-source.component';
import { Todo } from '../server';
import { DemoService } from './demo.service';

@Component({
  standalone: true,
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  imports: [
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgFor,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ViewSourceComponent,
  ],
})
export class DemoComponent implements OnDestroy {
  userId = 0;

  disabledTodoIds = new Set<number>();

  private subscription = this.demoService.pending$.subscribe((pending) => {
    if (pending === false) {
      this.disabledTodoIds.clear();
    }
  });

  constructor(protected demoService: DemoService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetch() {
    this.userId = 1 + (this.userId % 5);
    this.demoService.fetch(this.userId);
  }

  remove(id: number) {
    this.demoService.remove(id);
    this.disabledTodoIds.add(id);
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.demoService.update(todo);
  }

  updateTitle(todo: Todo, title: string) {
    todo.title = title;
    this.demoService.update(todo);
  }

  trackById(_: number, { id }: Todo) {
    return id;
  }
}
