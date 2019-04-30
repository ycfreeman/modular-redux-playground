describe("test store", () => {
  const testInitState = {
    test: 0
  };

  const testAction = {
    type: "TEST_ACTION"
  };

  const testAction1 = {
    type: "TEST_ACTION_1"
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

  let module;

  beforeEach(() => {
    Date.now = jest.fn().mockReturnValue(0);

    module = require("../store"); // anything with plugin_rewire just use dist for sanity
  });

  afterEach(() => {
    module = null;
    jest.resetModules();
    jest.resetAllMocks();
  });

  it("installReducer", () => {
    const { storeCreator, installReducer } = module;

    installReducer("test", testReducer);

    const store = storeCreator();
    expect(store).not.toBeUndefined();
    expect(store.getState()).toMatchSnapshot();
    store.dispatch(testAction);
    expect(store.getState()).toMatchSnapshot();

    installReducer("test2", testReducer);
    store.dispatch(testAction1);
    expect(store.getState()).toMatchSnapshot();
  });
});
