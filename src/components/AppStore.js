import React , {Component} from 'react'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { reducer as formReducer } from 'react-redux-form'
import {combineForms, createForms} from 'react-redux-form'

import thunk from 'redux-thunk'
import freducer from '../reducers/reduce'
import {crudReducer} from '../reducers/crudReducer'

export default function InitStore(preloadedState) {

    const reducers = {
        freducer,
        personAddressReducer: crudReducer('PersonAddress'),
        personReducer: crudReducer('Person'),
    }
    const reducer = combineReducers(reducers);


    const logger = store => next => action => {
        console.log('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        return result;
    }

    const mymiddleware = applyMiddleware(
      thunk,
      logger,
    );
    const store = createStore(
      reducer,
      compose(
        mymiddleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f),

    );
    {
        console.log(process.env.NODE_ENV)
    }
    if (process.env.NODE_ENV !== "production") {
        if (module.hot) {
            module.hot.accept("../reducers/reduce", () => {
                const newRootReducer = require("../reducers/reduce").freducer;
                store.replaceReducer(newRootReducer)
            });
        }
    }
    return store;
}