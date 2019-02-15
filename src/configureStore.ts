import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { IApplicationState, rootReducer, rootSaga } from "./store";

export function configureStore(
  initialState?: IApplicationState,
): Store<IApplicationState> {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState!,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
