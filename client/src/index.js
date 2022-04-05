import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './Store/Reducers'
import sagas from './Store/Sagas'
import {composeWithDevTools} from 'redux-devtools-extension'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers,composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
reportWebVitals()
