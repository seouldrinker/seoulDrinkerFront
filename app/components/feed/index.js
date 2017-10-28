import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'

import FeedHeaderComponent from './header'
import FeedImagesComponent from './images'
import FeedContentsComponent from './contents'
import FeedTooltip from './tooltip'

export default class FeedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipOn: false
    }

    this.pressTooltipButton = this.pressTooltipButton.bind(this)
  }

  pressTooltipButton(status) {
    this.setState({ tooltipOn: status })
  }

  render() {
    return (
      <TouchableHighlight onPress={() => {
          this.pressTooltipButton(false)
        }} activeOpacity={1}>
        <View>
          <FeedHeaderComponent
            feedId={this.props.data._id}
            date={this.props.data.udt_dt}
            picture={this.props.data.user.picture}
            name={this.props.data.user.name}
            feedUserId={this.props.data.user._id}
            signedUpUserId={this.props.signedUpUserId}
            tooltipOn={this.state.tooltipOn}
            pressTooltipButton={this.pressTooltipButton}
          />
          <FeedImagesComponent image={this.props.data.image} />
          <FeedContentsComponent
            pub={this.props.data.pub}
            beers={this.props.data.beers}
            context={this.props.data.context}
            navigation={this.props.navigation}
          />
          {
            this.state.tooltipOn ? (
              <FeedTooltip
                data={this.props.data}
                pressTooltipButton={this.pressTooltipButton}
                deleteFeed={this.props.deleteFeed}
                navigation={this.props.navigation}
              />
            ) : null
          }
        </View>
      </TouchableHighlight>
    )
  }
}
