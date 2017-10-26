import React, { Component } from 'react'
import {
  View,
  Text,
  ListView,
  Dimensions,
} from 'react-native'

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

import FeedComponent from '../../components/feed'

export default class MyFeed extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.auth && this.props.auth.feedList) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })

      let signedUpUserId = null
      if (this.props.auth.signedUpUser) {
        signedUpUserId = this.props.auth.signedUpUser._id
      }
      return (
        <View>
          <ListView
            enableEmptySections={true}
            dataSource={ds.cloneWithRows(this.props.auth.feedList)}
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
    } else {
      return <Text>Loading...</Text>
    }
  }
}
