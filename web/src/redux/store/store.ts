import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import currentUserReducer from "../reducers/currentUserReducer";
import rootSaga from "../sagas";

const reducers = {
  currentUser: currentUserReducer,
};

const rootReducer = combineReducers({
  ...reducers,
});

let store = null;

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  store = createStore(rootReducer, composeWithDevTools(...enhancers));

  sagaMiddleware.run(rootSaga);

  return store;
};
