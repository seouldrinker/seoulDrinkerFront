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

class BeerRank extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }

  render() {
    if (this.props.beerRank) {
      return (
        <View style={{ backgroundColor: '#fff', }}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.ds.cloneWithRows(this.props.beerRank)}
            style={{ paddingTop: 4, paddingBottom: 6, }}
            renderRow={rowData => {
              return rowData ? (
                <RankComponent
                  rank={rowData}
                  navigation={this.props.navigation}
                  isBeer={true}
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
          animating={!this.props.beerRank}
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
  beerRank: state.beerData.beerRank,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(BeerRank)
