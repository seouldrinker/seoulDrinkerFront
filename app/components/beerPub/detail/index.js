import React, { Component } from 'react'
import {
  View,
  Dimensions,
} from 'react-native'

import BeerDetailContextHeaderComponent from '../../beer/detail/contextHeader'
import PubDetailContextHeaderComponent from '../../pub/detail/contextHeader'
import BeerPubDetailContextBodyComponent from './contextBody'
import BeerPubDetailRankComponent from './rank'

const { width, height } = Dimensions.get('window')

export default class BeerPubDetailComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        {
          this.props.isBeer ? (
            <BeerDetailContextHeaderComponent
              data={this.props.data}
              />
          ) : (
            <PubDetailContextHeaderComponent
              data={this.props.data}
              />
          )
        }
        <BeerPubDetailContextBodyComponent
          data={this.props.data} isBeer={this.props.isBeer}
          />
        {
          (this.props.data.feedList && this.props.data.feedList.length > 0) ? (
            <BeerPubDetailRankComponent
              data={this.props.data} rank={this.props.rank}
              />
          ) : null
        }
      </View>
    )
  }
}
