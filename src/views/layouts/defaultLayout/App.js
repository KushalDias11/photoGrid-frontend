import React from 'react';
import './App.css';
import { Switch,  Route, } from 'react-router-dom';
import PhotoList from '../../containers/photo-Library/photoList';
import PhotoGrid from '../../containers/photo-Library/photoGrid';
import { ToastContainer } from 'react-toastify';
import { withRouter } from 'react-router';

/**
 * Main app initializer
 * @returns {html} Main applications
 */
function App() {
  return (
      <div>
      <ToastContainer autoClose={6000} />
        <Switch>
          <Route exact path="/" component={PhotoList} />
          <Route exact path="/grid/:uid" component={PhotoGrid} />
        </Switch>
      </div>
  );
}

export default withRouter(App);
