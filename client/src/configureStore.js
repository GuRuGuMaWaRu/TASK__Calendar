import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

export const configureStore = () => {
  // if (process.env.MODE_ENV !== "production") {
  //   return createStore(
  //     rootReducer,
  //     compose(
  //       applyMiddleware(thunk),
  //       window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //         window.__REDUX_DEVTOOLS_EXTENSION__()
  //     )
  //   );
  // }

  return createStore(rootReducer, applyMiddleware(thunk));
};
