import React, { Component } from 'react'
import { View } from 'react-native'

import FeedHeaderComponent from './header'
import FeedImagesComponent from './images'
import FeedContentsComponent from './contents'

export default class FeedComponent extends Component {
  render() {
    return (
      <View>
        <FeedHeaderComponent
          feedId={this.props.data._id}
          date={this.props.data.udt_dt}
          picture={this.props.data.user.picture}
          name={this.props.data.user.id}
        />
        <FeedImagesComponent image={this.props.data.image} />
        <FeedContentsComponent
          pub={this.props.data.pub}
          beers={this.props.data.beers}
          context={this.props.data.context}
        />
      </View>
    )
  }
}
