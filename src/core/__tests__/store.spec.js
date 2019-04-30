import { compose } from "redux";

const testInitState = {
  test: 0
};

const testAction = {
  type: "TEST_ACTION"
};

const testReducer = (state = testInitState, action) => {
  switch (action.type) {
    case "TEST_ACTION":
      return Object.assign({}, state, { test: state.test + 1 });
    case "TEST_ACTION_1":
      return Object.assign({}, state, { test: state.test - 1 });
    default:
      return Object.assign({}, state);
  }
};

const testMiddleware = () => next => action => next(action);

describe("test store", () => {
  let module;

  beforeEach(() => {
    module = require("../store"); // anything with plugin_rewire just use dist for sanity
  });

  afterEach(() => {
    module = null;
    jest.resetModules();
    jest.resetAllMocks();
  });

  it("init store", () => {
    const { storeCreator } = module;

    const store = storeCreator();
    expect(store).not.toBeUndefined();
    expect(store.getState()).toMatchSnapshot();

    const store2 = storeCreator(compose, false);
    expect(store2).not.toBeUndefined();
    expect(store2).not.toEqual(store);
  });

  it("installReducer", () => {
    const { storeCreator, installReducer } = module;

    installReducer("test", testReducer);

    const store = storeCreator();
    expect(store).not.toBeUndefined();
    expect(store.getState()).toMatchSnapshot();
    store.dispatch(testAction);
    expect(store.getState()).toMatchSnapshot();
    expect(module.installed.reducers).toMatchSnapshot();

    expect(() => {
      installReducer("test2", testReducer);
    });
  });

  it("installMiddleware", () => {
    const { storeCreator, installMiddleware } = module;
    installMiddleware(testMiddleware);
    expect(module.installed.middlewares).toMatchSnapshot();

    const store = storeCreator();
    expect(store).not.toBeUndefined();

    expect(() => {
      installMiddleware(testMiddleware);
    }).toThrow();
  });
});
