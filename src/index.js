import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <CoreLayout>
      <Routes />
    </CoreLayout>
  </Provider>,
  document.getElementById('root')
);
