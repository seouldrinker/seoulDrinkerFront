import React, { Component } from 'react'
import { View, Image, Dimensions } from 'react-native'

import styles from '../../styles/feed'

const { width, height } = Dimensions.get('window')

import { STATIC_URL } from '../../actions'

export default class FeedImagesComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <View style={ styles.feedImageContainer }>
        <View style={{ width, height: width }}>
          <Image
            resizeMode="stretch"
            style={{ flex: 1, width, height }}
            source={{ uri: `${STATIC_URL}/${this.props.image}` }} />
        </View>
      </View>
    )
  }
}
