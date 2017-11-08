import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

import { makeTimer } from '../../components/common'
import MyBeerPubComponent from '../../components/my/tab/beerPub'

export default class MyBeer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.beerList) {
      return (
        <MyBeerPubComponent
          dataList={this.props.beerList}
          dataCounter={this.props.auth.beerCounter}
          naviPage={'BeerDetail'}
          navigation={this.props.navigation}/>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', marginTop: 70, }}>
        <ActivityIndicator
          animating={!this.props.beerList}
          color='#eea51b'
          size="large"
          style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 100, }}/>
      </View>
    )
  }
}
