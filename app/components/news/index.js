import React, { Component } from 'react'
import { View, } from 'react-native'

import NewsHeaderComponent from './header'
import NewsImagesComponent from './images'
import NewsContentsComponent from './contents'

export default class NewsComponent extends Component {
  render() {
    return (
      <View>
        <NewsHeaderComponent date={this.props.data.udt_dt} />
        <NewsImagesComponent image={this.props.data.image} />
        <NewsContentsComponent context={this.props.data.context} />
      </View>
    )
  }
}
