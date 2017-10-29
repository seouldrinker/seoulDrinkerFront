import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../../actions"

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

import RankComponent from '../../components/rank'

class PubRank extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    if (this.props.pubRank) {
      return (
        <View style={{ backgroundColor: '#fff', }}>
          <ListView
            enableEmptySections={true}
            dataSource={ds.cloneWithRows(this.props.pubRank)}
            style={{ paddingTop: 10, }}
            renderRow={rowData => {
              return rowData ? (
                <RankComponent
                  rank={rowData}
                  navigation={this.props.navigation}
                  isBeer={false}
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
          animating={!this.props.pubRank}
          color='#eea51b'
          size="large"
          style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 100, }}/>
      </View>
    )
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  pubRank: state.pubData.pubRank,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(PubRank)
