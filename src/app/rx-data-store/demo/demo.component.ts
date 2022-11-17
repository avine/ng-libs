import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { Todo } from '../server';
import { DemoService } from './demo.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf, NgFor, MatListModule, MatInputModule],
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnDestroy {
  disabled: Todo[] = [];

  subscription = this.demoService.pending$.subscribe((pending) => {
    if (pending === false) {
      this.disabled = [];
    }
  });

  constructor(protected demoService: DemoService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  update() {
    this.demoService.update({
      userId: 1,
      id: 3,
      title: 'Updated',
      completed: true,
    });
  }

  remove(id: number) {
    this.demoService.remove(id);
  }

  toggleCompleted(todo: Todo) {
    this.demoService.update({ ...todo, completed: !todo.completed });
  }

  updateTitle(todo: Todo, title: string) {
    this.disabled.push(todo);
    this.demoService.update({ ...todo, title });
  }

  trackById(_: number, { id }: Todo) {
    return id;
  }
}
