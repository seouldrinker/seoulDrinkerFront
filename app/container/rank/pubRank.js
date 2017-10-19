import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../../actions"

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

class PubRank extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getPubList()
  }

  render() {
    return (
      <View>
        <Text>test</Text>
      </View>
    )
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  pubData: state.pubData,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(PubRank)
