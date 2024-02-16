const DB_NAME: string = "recorder-db";
const DB_VERSION: number = 1;
const STORE_NAME = "recording";

class DbProvider {
  db: IDBDatabase | null = null;

  openDB() {
    if (this.db) {
      return this.db;
    }

    const indexedDB =
      window.indexedDB ||
      (window as any).mozIndexedDB ||
      (window as any).webkitIndexedDB ||
      (window as any).msIndexedDB ||
      (window as any).shimIndexedDB;

    if (!indexedDB) {
      console.error("Browser does not support indexedDB");
      return;
    }

    const requset = indexedDB.open(DB_NAME, DB_VERSION);

    requset.onerror = this.onError;
    requset.onupgradeneeded = this.onUpgradeNeeded;
    requset.onsuccess = this.onSuccess;
  }

  private onError(event: Event) {
    const { code, message, name } = (event.target as IDBOpenDBRequest).error!;

    console.error(`Error code - ${code}: ${message}, ${name}`);
  }

  private onUpgradeNeeded(event: IDBVersionChangeEvent) {
    this.db = (event.target as IDBOpenDBRequest).result;

    if (!this.db.objectStoreNames.contains(STORE_NAME)) {
      console.log(`Creating object store: ${STORE_NAME}`);
      this.db.createObjectStore(STORE_NAME, { keyPath: "chunkID" });
    }
  }

  private onSuccess(event: Event) {
    this.db = (event.target as IDBOpenDBRequest).result;

    console.log("IndexedDB is opened.");
  }

  getItems() {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readonly");
      const objectStore = transaction.objectStore(STORE_NAME);
      const requset = objectStore.getAll();

      requset.onsuccess = (event: Event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };
      requset.onerror = (event: Event) => {
        reject(new Error("Can't get items."));
      };
    });
  }

  addItem(item: any) {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const requset = objectStore.add(item);

      requset.onsuccess = (event: Event) => {
        resolve(item);
      };
      requset.onerror = (event: Event) => {
        reject(new Error("Couldn't add item."));
      };
    });
  }
}

export const dbProvider = new DbProvider();
