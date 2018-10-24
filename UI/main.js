import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import AppContainer from './containers/AppContainer.jsx';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [];
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
));

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
)