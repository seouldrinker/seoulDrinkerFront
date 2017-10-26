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

export default class MyBeer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MyBeerPubComponent
        dataList={this.props.beerList}
        dataCounter={this.props.auth.beerCounter}
        naviPage={'BeerDetail'}
        navigation={this.props.navigation}/>
    )
  }
}
