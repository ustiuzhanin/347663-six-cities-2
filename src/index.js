import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import createAPI from './api';
// import {Operations} from './reducer';
import {Operations} from './reducer/data/data';
import {BrowserRouter} from 'react-router-dom';

import App from './components/app/app.jsx';
// import {reducer} from './reducer';
import reducer from './reducer/index';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  store.dispatch(Operations.loadData());

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById(`root`)
  );
};

init();
