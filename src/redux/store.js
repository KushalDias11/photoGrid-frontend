import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from './rootReducers';
import globalSagas from "./rootsagas";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./rootReducers";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const enhancers = [];
const middleware = [sagaMiddleware, routerMiddleware(history)];

/**
 * Configure redux store
 * @param {object} Initial loading state
 * @returns {object} Configured redux store
 */
function configureStore(preloadedState) {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-underscore-dangle
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  );

  sagaMiddleware.run(globalSagas);
  return store;
}

export default configureStore;
