'use client';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from '@/state/reducers';
import { thunk } from 'redux-thunk';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
