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

class BeerRank extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getBeerList()
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
  beerData: state.beerData,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(BeerRank)
