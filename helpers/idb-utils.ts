import { openDB } from 'idb';

const dbPromise = openDB('places-store', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('places')) {
      db.createObjectStore('places', { keyPath: 'id' });
    }
  }
});

export function writeData(storeName: string, data: any) {
  return dbPromise.then((db) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.put(data);
    return tx.done;
  });
}

export function readData(storeName: string) {
  return dbPromise.then((db) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return store.getAll();
  });
}

export function clearData(storeName: string) {
  return dbPromise.then((db) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.clear();
    return tx.done;
  });
}

export function deleteItemFromData(storeName: string, id: string) {
  dbPromise
    .then((db) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.delete(id);
      return tx.done;
    })
    .then(() => {
      console.log('Item deleted');
    });
}
