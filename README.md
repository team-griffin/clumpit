# clumpit

## Usage

```js

import createClumpit from 'clumpit';

const clumpit = createClumpit({
  dedupe: true,
});

const a = clumpit.add('1', {
  foo: 'bar',
});

const b = clumpit.add('1', {
  foo: 'quz',
});

const c = clumpit.add('2', {
  foo: 'baz',
});

const d = clumpit.run((items) => {
  return Promise.resolve({
    '1': 'x',
    '2': 'y',
  });
});

```