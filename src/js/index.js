import React from 'react';
import { render } from 'react-dom';
import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form/immutable';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import axios from 'axios';
import rootReducer from './reducers/index';
import authReducer from './reducers/auth';
import bookListReducer from './reducers/bookList';
import bookEditorReducer from './reducers/bookEditor';
import App from './components/App';
import { setupAxiosAuthHeader, setupAxiosInterceptor } from './utils/auth';
import history from './utils/history';

const reducer = combineReducers({
  root: rootReducer,
  auth: authReducer,
  bookList: bookListReducer,
  bookEditor: bookEditorReducer,
  form: formReducer,
});

// eslint-disable-next-line
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  storeEnhancers(applyMiddleware(thunk)),
);

axios.defaults.baseURL = process.env.API_URL;
setupAxiosAuthHeader();
setupAxiosInterceptor(store);

render((
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
), document.getElementById('root'));
