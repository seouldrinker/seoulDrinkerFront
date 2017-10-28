import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from './app/reducers'
import AppWithNavigationState from './app/navigation/appNavigator'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

const store = createStore(reducer, {}, compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('seoulDrinkerFront', () => App)
