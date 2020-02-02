import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/layouts/defaultLayout/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore, { history } from "./redux/store";
import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ConnectedRouter } from 'connected-react-router'
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <App />
    </ConnectedRouter>    
  </Provider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
