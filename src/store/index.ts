import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

export function configureStore() {
 return createStore(
  rootReducer,
   applyMiddleware(thunk),
 );
}
