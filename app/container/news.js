import React, { Component } from 'react'
import {
  Text,
  View,
  Image
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import styles from '../styles/common'

export default class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'hohoho',
      tabBarLabel: 'hhh',
      tabBarIcon: ({ tintColor }) => (
        <Text size={24} color="white">SB</Text>
      ),
    }
  }

  componentDidMount () {
    // console.log(this.props.screenProps.user)
  }

  render() {
    return (
      <View style={styles.container}>
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
