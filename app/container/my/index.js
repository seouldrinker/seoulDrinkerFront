import React, { Component } from 'react'
import {
  Text,
  View,
  Image
} from 'react-native'

import styles from '../../styles/common'

export default class My extends Component {
  static navigationOptions = {
  }

  render() {
    return (
      <View>
        <View style={{ backgroundColor: '#fff', height: 56, elevation: 8, }}>
          <Text style={{ marginTop: 16, marginLeft: 60, color: '#000',
            fontSize: 18, fontWeight: '500', }}>마이 페이지</Text>
        </View>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}
