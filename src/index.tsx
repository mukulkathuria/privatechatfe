import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import SuspenseLoader from './Components/common/SuspenseLoader/SuspenseLoader';
import { store } from './Redux/store/store';

const container = document.getElementById('root');
const root = createRoot(container!);

const App = SuspenseLoader(lazy(() => import('./app')));
const GlobalStyle = SuspenseLoader(lazy(() => import('./gobal.style')));

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
