import React, { Component } from 'react'
import {
  Text,
  View,
  Image
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from "../../actions"

import styles from '../../styles/common'

class FeedMap extends Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation }) => {
    return {
    }
  }

  componentDidMount () {
    if (!this.props.auth.isLoggedIn) {
      this.props.navigation.navigate('Login')
      return 0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Welcome to React Native!
        </Text>
        <Text>
          To get started, edit index.ios.js
        </Text>
        <Text>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}

export default connect(state => ({
  auth: state.auth,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(FeedMap)
