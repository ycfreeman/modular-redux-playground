import { isEmpty as _isEmpty } from "lodash";
import {
  applyMiddleware,
  compose as _compose,
  createStore,
  Middleware,
  Reducer,
  Store,
  combineReducers
} from "redux";
import thunk from "redux-thunk";

/**
 * @internal
 */
class InjectableStoreCreator {
  private _reducers: { [key: string]: Reducer<any> } = {};

  public get reducers(): { [p: string]: Reducer<any> } {
    return this._reducers;
  }

  private get combinedReducer(): Reducer<any> {
    const reducerMap = {
      ...this.reducers
    };
    return _isEmpty(reducerMap) ? s => s : combineReducers(reducerMap);
    // this returns a snapshot of combined reducer base on the options and enhancers at the time of resolve
  }

  private _middlewares: Middleware[] = [];

  public get middlewares(): Middleware[] {
    return this._middlewares;
  }

  private _store?: Store<any>;

  public storeCreator(
    compose = _compose,
    isInjectable: boolean = true
  ): Store<any> {
    // update reducers list with new entity reducer
    const enhancer = compose(applyMiddleware(thunk, ...this.middlewares));
    const initialState = {};
    const store = createStore(this.combinedReducer, initialState, enhancer);
    if (isInjectable) {
      this._store = store;
      return this._store; // return shared injectable store instance
    } else {
      return store; // return store with snapshotted properties
    }
  }

  public installReducer(name: string, reducer: Reducer<any>): void {
    this._reducers[name] = reducer;
    if (this._store !== undefined) {
      const newCombinedReducer = this.combinedReducer;
      this._store.replaceReducer(newCombinedReducer);
    }
  }

  public installMiddleware(...middlewares: Middleware[]): void {
    if (this._store) {
      throw Error(
        "incorrect usage, method must be called before storeCreator is called"
      );
    }
    this._middlewares = [...this._middlewares, ...middlewares];
  }
}

// external APIs
const injectable = new InjectableStoreCreator();

export const storeCreator = (...args: any): Store<any> =>
  injectable.storeCreator.apply(injectable, args);

export const installReducer: (name: string, reducer: any) => void = (...args) =>
  injectable.installReducer.apply(injectable, args);
export const installMiddleware: (...middlewares: Middleware[]) => void = (
  ...args
) => injectable.installMiddleware.apply(injectable, args);
/**
 * @internal
 * getters for tests
 */
export const installed = {
  get middlewares() {
    return injectable.middlewares;
  },
  get reducers() {
    return injectable.reducers;
  }
};
