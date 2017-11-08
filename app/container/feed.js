import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  ListView,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from "../actions"

import stylesCommon from '../styles/common'

import FeedComponent from '../components/feed'

const { width, height } = Dimensions.get('window')

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }

    this.props.navigation.setParams({
      initFeedList: this.props.getFeedList,
    })
  }
  static navigationOptions = ({ navigation }) => ({
    tabBarOnPress: (scene, jumpToIndex) => {
      if (!scene || !scene.focused) {
        navigation.state.params.initFeedList(true)
      }
      jumpToIndex(scene.index)
    },
  })

  componentDidMount () {
    console.disableYellowBox = true
    SplashScreen.hide()

    if (!this.props.auth.isLoggedIn) {
      this.props.navigation.navigate('Login')
      return 0
    }
    this.props.getFeedList(true)
    this.props.getPubList()
    this.props.getBeerList()
    this.props.getPubRank()
    this.props.getBeerRank()
  }

  render() {
    if (this.props.feedData && this.props.feedData.feedList) {
      let signedUpUserId = null
      if (this.props.auth && this.props.auth.signedUpUser) {
        signedUpUserId = this.props.auth.signedUpUser._id
      }

      return (
        <View>
          <View style={{ flexDirection: 'row', backgroundColor: '#eea51b',
            height: 56, width, elevation: 8, alignItems: 'center', justifyContent: 'center', }}>
            <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, }}
              onPress={() => {
                if (this.props.nav.routes[this.props.nav.index].routeName !== 'Record') {
                  this.props.navigation.navigate('Record')
                }
              }}>
              <Image source={require('../images/common/record.png')}
                style={{ width: 22, height: 20, marginLeft: 28, marginTop: 18, }}/>
            </TouchableOpacity>
            <Image source={require('../images/common/logo.png')}
              style={{ width: 156, height: 28, }}/>
          </View>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.ds.cloneWithRows(this.props.feedData.feedList)}
            renderRow={rowData => {
              return rowData ? (
                <FeedComponent
                  data={rowData}
                  deleteFeed={this.props.deleteFeed}
                  nav={this.props.nav}
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
