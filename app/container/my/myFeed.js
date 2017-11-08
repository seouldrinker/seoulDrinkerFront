import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

import FeedComponent from '../../components/feed'

export default class MyFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }

  render() {
    if (this.props.auth && this.props.auth.feedList) {
      let signedUpUserId = null
      if (this.props.auth.signedUpUser) {
        signedUpUserId = this.props.auth.signedUpUser._id
      }
      return (
        <View>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.ds.cloneWithRows(this.props.auth.feedList)}
            renderRow={rowData => {
              return rowData ? (
                <FeedComponent
                  data={rowData}
                  deleteFeed={this.props.deleteFeed}
                  navigation={this.props.navigation}
                  signedUpUserId={signedUpUserId}
                />
              ) : null
            }}
          />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', marginTop: 70, }}>
        <ActivityIndicator
          animating={!this.props.auth || !this.props.auth.feedList}
          color='#eea51b'
          size="large"
          style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 100, }}/>
      </View>
    )
  }
}
