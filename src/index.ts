import uniqueBy from 'lodash.uniqby';
import keyBy from 'lodash.keyby';

type Item = {
  id: string,
  data: Object,
  resolve: () => void,
  reject: () => void,
};

export type RunFunction<R> = (items: Array<Item>) => Promise<R>;
export type Options = {
  dedupe: boolean,
};

export type Clumpit = {
  add: <T>(id: string, data: Object) => Promise<T>,
  run: <T>(fn: RunFunction<T>) => Promise<void>,
};

function dedupe(items) {
  return uniqueBy(items, (item) => item.id);
}

function createClumpit(options: Options): Clumpit {
  const items: Array<Item> = [];

  function add<T>(id: string, data: Object): Promise<T> {
    return new Promise((resolve, reject) => {
      items.push({
        id,
        data,
        resolve,
        reject,
      });
    });
  }

  function run<R>(fn: RunFunction<R>): Promise<void> {
    const deduped = dedupe(items);

    return fn(items).then((results) => {
      const keydItems = keyBy(deduped, (item) => item.id);

      for(const id in results) {
        const result = results[id];

        keydItems[id].resolve(result);
      }

      return Promise.resolve();
    });
  }

  return {
    add,
    run,
  };
}

export default createClumpit;
