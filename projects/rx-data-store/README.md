# rx-data-store

From data source to reactive data store.

## Demo

Check out [demo here](https://avine.github.io/ng-libs/rx-data-store).

## Introduction

If you write the following code all the time, then this package is for you...

Let's say you have the following **data source**:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<User>('/api/user');
  }
}
```

Here is the associated **data store** service and the component that consumes it:

```ts
import { map, ReplaySubject, tap } from 'rxjs';
import { Component, Injectable, OnInit } from '@angular/core';

@Injectable()
export class UserService {
  private _user$ = new ReplaySubject<User>(1);

  user$ = this._user$.asObservable();

  constructor(private userApiService: UserApiService) {}

  get() {
    return this.userApiService.get().pipe(
      tap((user) => this._user$.next(user)),
      map(() => undefined) // Force the developer to get the user data from `user$`
    );
  }
}

@Component({
  selector: 'app-root',
  template: '<h1>Hello {{ (user$ | async)?.name }}</h1>',
})
export class AppComponent implements OnInit {
  // Select data from data store
  user$ = this.userService.user$;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Dispatch data store action
    this.userService.get().subscribe();
  }
}
```

Hmm... This is very verbose just to expose the `user$` observable.
Now let's use `RxDataStore` to simplify it all!

```ts
@Injectable()
export class UserService extends RxDataStore<User> {
  constructor(private userApiService: UserApiService) {
    // Calling 'super' is equivalent to writing:
    //   const dataSource = () => this.userApiService.get();
    //   const dataStore = new RxDataStore(dataSource);
    super(() => this.userApiService.get());
  }
}

@Component({
  selector: 'app-root',
  template: '<h1>Hello {{ (user$ | async)?.name }}</h1>',
})
export class AppComponent implements OnInit {
  // The observable `data$` is an instance property of the class `RxDataStore`.
  user$ = this.userService.data$;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // `fetch` is an instance method of the class `RxDataStore`.
    this.userService.fetch();
  }
}
```

In this example, the `UserService` inherits from `RxDataStore`.
But, it's perfectly fine to use `RxDataStore` as an instance property of the `UserService`.

```ts
@Injectable()
export class UserService {
  store = new RxDataStore<User>(() => this.userApiService.get());

  constructor(private userApiService: UserApiService) {}
}
```

We're just scratching the surface here.
Let's dive into the rich features of `RxDataStore`.

## API

The data source is a function that returns an observable.
Let's say this observable emits 2 consecutive values.

```ts
import { of } from 'rxjs';

const dataSource = (n: number) => of(n, n + 1).pipe(delay(0));
```

### fetch data from data source

```ts
import { RxDataStore } from '@avine/rx-data-store';

// Define the data store
const dataStore = new RxDataStore(dataSource);

// Fetch data from the data source (subscribe to `dataSource(1)`)
dataStore.fetch(1);

// Subscribe to data from the data store
dataStore.data$.subscribe((data) => console.log(data)); // 1, 2
```

Note that the order does not matter. You can subscribe to `data$` even after the `fetch` method has been called.

### Set default arguments for data fetching

Calling the `fetch` method is not necessary when the default arguments of the data source function are provided.

```ts
// Data will be fetched using the provided arguments (but only when `data$` is subscribed)
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2
```

Note that even when the data source function has no arguments, you must set the default arguments to an empty array
(if you don't want to call the `fetch` method).

```ts
new RxDataStore(dataSource, []);
```

### setData

Replace data in the data store without fetching the data source.

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 3

// Set data in data store
dataStore.setData(3);
```

### updateData

Update the data in the data store based on the current state of the data.

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 3

dataStore.updateData((data) => data + 1);
```

### refresh

Refresh data from the data source using the latest arguments.

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 1, 2

// Subscribe to `dataSource(1)` again
dataStore.refresh();
```

### mutation

Subscribe to an observable (the mutation) and update the data in the data store based on the current state of the data and the response of the observable.

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 3

// Note that you must call `subscribe` in order to execute the mutation.
dataStore.mutation(of(1), (data, response) => data + response).subscribe(); // 2 + 1 === 3
```

### mutationQueue

Execute several mutations in order.

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 3, 4

// Note that this time you don't call `subscribe` in order to execute the mutations.
dataStore.mutationQueue(of(1), (data, response) => data + response); // 2 + 1 === 3
dataStore.mutationQueue(of(1), (data, response) => data + response); // 3 + 1 === 4
```

### pending

The observable `pending$` emits `true` when a task is in progress and `false` when it is idle.

```ts
dataStore.pending$.subscribe(console.log); // true, false
```

### error

The observable `error$` emits errors that occur during task processing.

```ts
dataStore.error$.subscribe(console.log);
```

### map

You can map the data emitted by the `data$` observable.
This can be useful if, for example, you want to deeply clone the emitted data for immutability reasons.

```ts
import { cloneDeep } from 'lodash';

// Set the `map` method locally for the dataStore instance only.
dataStore.map = cloneDeep;

// Or set the `map` method globally for all dataStore instances.
RxDataStore.map = cloneDeep;

// You can still bypass the global settings for a particular instance this way:
dataStore.map = 'noop';
```

### useCache

Note that the lastest data is always cached in the data store.
Enabling the cache is useful when the data source is called with different arguments.

```ts
const useCache = true;
const dataStore = new RxDataStore(dataSource, undefined, useCache);

dataStore.fetch(1); // Calling `dataSource(1)`

dataStore.fetch(2); // Calling `dataSource(2)`

dataStore.fetch(1); // Gettting data from the data store cache
```

### clearCache

You can clear the cache at any time.

```ts
dataStore.clearCache();
```

## License

[MIT](https://github.com/avine/ng-libs/blob/main/LICENSE)
