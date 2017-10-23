import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  BackHandler,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from "../actions"

import stylesCommon from '../styles/common'

import FeedComponent from '../components/feed'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.handleBackPress = this.handleBackPress.bind(this)

    this.props.navigation.setParams({
      initFeedList: this.props.getFeedList,
    })
  }
  static navigationOptions = ({ navigation }) => ({
    tabBarOnPress: (scene, jumpToIndex) => {
      navigation.state.params.initFeedList()
      jumpToIndex(scene.index)
    },
  })

  handleBackPress () {
    if (this.props.nav.routes.length <= 3) {
      return false
    }
    this.props.navigation.dispatch({ type: 'Navigation/BACK', key: null, })
    return true
  }

  componentDidMount () {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    if (!this.props.auth.isLoggedIn) {
      this.props.navigation.navigate('Login')
      return 0
    }
    this.props.getFeedList()
    this.props.getPubRank()
    this.props.getBeerRank()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render() {
    if (this.props.feedData && this.props.feedData.feedList) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })

      let signedUpUserId = null
      if (this.props.auth && this.props.auth.signedUpUser) {
        signedUpUserId = this.props.auth.signedUpUser.id
      }
      return (
        <View>
          <ListView
            dataSource={ds.cloneWithRows(this.props.feedData.feedList)}
            renderRow={rowData => {return <FeedComponent
              data={rowData}
              deleteFeed={this.props.deleteFeed}
              navigation={this.props.navigation}
              signedUpUserId={signedUpUserId}
              />}}
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
  feedData: state.feedData,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(Feed)
