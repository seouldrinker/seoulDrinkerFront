import { AppRegistry } from 'react-native'
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

import commonStyles from './app/styles/common'
import indexStyles from './app/styles'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

class App extends Component<{}> {
  render() {
    return (
      <View style={StyleSheet.flatten([commonStyles.container, indexStyles.container])}>
        <Text style={indexStyles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={indexStyles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={indexStyles.instructions}>
          {instructions}
        </Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('seoulDrinkerFront', () => App)
