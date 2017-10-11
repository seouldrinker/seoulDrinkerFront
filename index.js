import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from './app/reducers'
import AppWithNavigationState from './app/navigation/appNavigator'

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

class App extends Component {
  configureStore(initialState) {
    const enhancer = compose(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
      ),
    )
    return createStore(reducer, initialState, enhancer)
  }

  render() {
    return (
      <Provider store={this.configureStore({})}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('seoulDrinkerFront', () => App)
