import React, { Component } from 'react'
import {
  Text,
  ListView,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../actions"

import styles from '../styles/common'

import NewsComponent from '../components/news'

class News extends Component {
  constructor(props) {
    super(props)

    this.props.navigation.setParams({
      initNewsList: this.props.getAllNewsList,
    })
  }
  static navigationOptions = ({ navigation }) => ({
    tabBarOnPress: (scene, jumpToIndex) => {
      navigation.state.params.initNewsList()
      jumpToIndex(scene.index)
    },
  })

  render() {
    if (this.props.newsData && this.props.newsData.newsList) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })

      return (
        <View style={{ marginBottom: 56 }}>
          <View style={{ backgroundColor: '#eea51b', height: 56, elevation: 8, }}>
            <Text style={{ marginTop: 14, marginLeft: 60, color: '#fff',
              fontSize: 20, fontWeight: '600', }}>News</Text>
          </View>
          <ListView
            enableEmptySections={true}
            dataSource={ds.cloneWithRows(this.props.newsData.newsList)}
            renderRow={rowData => {
              return rowData ? (
                <NewsComponent data={rowData} />
              ) : null
            }}
          />
        </View>
      )
    }
    return <Text>Loading...</Text>
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  newsData: state.newsData,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(News)
