import React, { Component } from 'react'
import { View, Image, Dimensions } from 'react-native'

import styles from '../../styles/news'

const { width, height } = Dimensions.get('window')

import { STATIC_URL } from '../../../config/config'

export default class NewsImagesComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <View style={{ width, height: width }}>
        <Image
          resizeMode="stretch"
          style={{ width, height: width }}
          source={{ uri: `${STATIC_URL}/${this.props.image}` }} />
      </View>
    )
  }
}
