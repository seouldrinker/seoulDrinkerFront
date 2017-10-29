import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  BackHandler,
  ActivityIndicator,
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
    const passibleRoute = this.props.nav.routes.filter(route => {
      return route.routeName !== 'Home' && route.routeName !== 'Login'
    })

    if (passibleRoute.length > 0) {
      this.props.navigation.dispatch({ type: 'Navigation/BACK', key: null, })
      return true
    }

    return false
  }

  componentDidMount () {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    if (!this.props.auth.isLoggedIn) {
      this.props.navigation.navigate('Login')
      return 0
    }
    this.props.getFeedList()
    this.props.getPubList()
    this.props.getBeerList()
    this.props.getPubRank()
    this.props.getBeerRank()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    
    if (this.props.feedData && this.props.feedData.feedList) {
      let signedUpUserId = null
      if (this.props.auth && this.props.auth.signedUpUser) {
        signedUpUserId = this.props.auth.signedUpUser._id
      }

      return (
        <View>
          <ListView
            enableEmptySections={true}
            dataSource={ds.cloneWithRows(this.props.feedData.feedList)}
            renderRow={rowData => {
              return rowData ? (
                <FeedComponent
                  data={rowData}
                  deleteFeed={this.props.deleteFeed}
                  navigation={this.props.navigation}
                  signedUpUserId={signedUpUserId}
                />
              ): null
            }}
          />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', marginTop: 70, }}>
        <ActivityIndicator
          animating={!this.props.feedData || !this.props.feedData.feedList}
          color='#eea51b'
          size="large"
          style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 80, }}/>
      </View>
    )
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  feedData: state.feedData,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(Feed)
