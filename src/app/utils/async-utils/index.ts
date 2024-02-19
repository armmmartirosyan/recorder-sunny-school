import { IDefer } from "../../models/shared-models";

export const createDefer = <T>() => {
  const defer: IDefer<T> = {
    promise: null,
    resolve: (value?: T) => {},
    reject: (error: Error) => {},
    reset() {
      defer.promise = new Promise((resolve, reject) => {
        defer.resolve = (value?: T) => {
          resolve(value as T);
        };
        defer.reject = (error: Error) => {
          reject(error);
        };
      });
    },
  };

  defer.reset();

  return defer;
};
