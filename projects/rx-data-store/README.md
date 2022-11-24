# rx-data-store

From data source to reactive data store.

## Demo

Check out [demo here](https://avine.github.io/ng-libs/rx-data-store).

## Introduction

If you writes the following code all the time, then this package is for you:

```ts
import { map, ReplaySubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Data source
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<User>('/api/user');
  }

  patch(partialUser: Partial<User>) {
    return this.httpClient.patch<User>('/api/user', partialUser);
  }
}

// Data store
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

  patch(partialUser: Partial<User>) {
    return this.userApiService.patch(partialUser).pipe(
      tap((patchedUser) => this._user$.next(patchedUser)),
      map(() => undefined) // Force the developer to get the user data from `user$`
    );
  }
}
```

## Usage

### Data fetching

```ts
import { of } from 'rxjs';
import { RxDataStore } from '@avine/rx-data-store';

const dataSource = (n: number) => of(n, n + 1).pipe(delay(0));

const dataStore = new RxDataStore(dataSource);

// Fetch data from data source
dataStore.fetch(1);

// Subscribe to data from data store
dataStore.data$.subscribe((data) => console.log(data)); // 1, 2
```

### Auto data fetching

```ts
// Data will be fetched using the provided default arguments (but only when data$ is subscribed)
const dataStore = new RxDataStore(dataSource, [1]);

// Subscribe to data from data store
dataStore.data$.subscribe((data) => console.log(data)); // 1, 2
```

### setData

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 3

// Set data in data store
dataStore.setData(3);
```

### updateData

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 3

// Update data in data store based on the current data state
dataStore.updateData((data) => data + 1);
```

### refresh

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 1, 2

// Refresh data from data source
dataStore.refresh();
```

### mutation

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 3

// Note that you need to subscribe in order to run mutation
dataStore.mutation(of(1), (data, response) => data + response).subscribe(); // 2 + 1 === 3
```

### mutationQueue

```ts
const dataStore = new RxDataStore(dataSource, [1]);

dataStore.data$.subscribe((data) => console.log(data)); // 1, 2, 3, 4

// Multiple requests are queued and executed in order
// (Note that you don't need to subscribe in order to run mutation)
dataStore.mutationQueue(of(1), (data, response) => data + response); // 2 + 1 === 3
dataStore.mutationQueue(of(1), (data, response) => data + response); // 3 + 1 === 4
```
