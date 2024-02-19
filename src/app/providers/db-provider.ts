import { DB_VERSION, STORE_NAME, DB_NAME } from "../constants/index";

class DbProvider {
  db: IDBDatabase | null = null;

  openDB(onDBReady: VoidFunction) {
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
    requset.onupgradeneeded = (e) => this.onUpgradeNeeded(e, onDBReady);
    requset.onsuccess = (e) => this.onSuccess(e, onDBReady);
  }

  private onError(event: Event) {
    const { code, message, name } =
      (event.target as IDBOpenDBRequest).error || {};

    console.error(`Error code - ${code}: ${message}, ${name}`);
  }

  private onUpgradeNeeded(
    event: IDBVersionChangeEvent,
    onDBReady: VoidFunction
  ): void {
    this.db = (event.target as IDBOpenDBRequest).result;

    if (!this.db.objectStoreNames.contains(STORE_NAME)) {
      this.db.createObjectStore(STORE_NAME, { keyPath: "chunkID" });
    }

    onDBReady();
  }

  private onSuccess(event: Event, onDBReady: VoidFunction): void {
    this.db = (event.target as IDBOpenDBRequest).result;
    onDBReady();
  }

  async getItems() {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const requset = objectStore.getAll();

      requset.onsuccess = (event: Event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };
      requset.onerror = () => {
        reject(new Error("Can't get items."));
      };
    });
  }

  async addItem(item: any) {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const requset = objectStore.add(item);

      requset.onsuccess = () => {
        resolve(item);
      };
      requset.onerror = () => {
        reject(new Error("Couldn't add item."));
      };
    });
  }

  async clear() {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readwrite");
      const objectStore = transaction.objectStore(STORE_NAME);
      const requset = objectStore.clear();

      requset.onsuccess = () => {
        resolve(true);
      };
      requset.onerror = () => {
        reject(new Error("Couldn't clear items."));
      };
    });
  }
}

export const dbProvider = new DbProvider();
