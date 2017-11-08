import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

import { makeTimer } from '../../components/common'
import MyBeerPubComponent from '../../components/my/tab/beerPub'

export default class MyPub extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.pubList) {
      return (
        <MyBeerPubComponent
          dataList={this.props.pubList}
          dataCounter={this.props.auth.pubCounter}
          naviPage={'PubDetail'}
          navigation={this.props.navigation}/>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', marginTop: 70, }}>
        <ActivityIndicator
          animating={!this.props.pubList}
          color='#eea51b'
          size="large"
          style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 100, }}/>
      </View>
    )
  }
}
