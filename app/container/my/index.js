import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../../actions"

const { width, height } = Dimensions.get('window')

import MyFeed from './myFeed'
import MyPub from './myPub'
import MyBeer from './myBeer'

import MyHeaderComponent from '../../components/my/header'
import MyContextComponent from '../../components/my/context'
import MyTapComponent from '../../components/my/tab'
import MyTooltip from '../../components/my/tooltip'

class My extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPage: 'feed',
      tooltipOn: false,
    }

    this.goDetail = this.goDetail.bind(this)
    this.getUserInfoDetail = this.getUserInfoDetail.bind(this)
    this.changeShowPage = this.changeShowPage.bind(this)
    this.pressTooltipButton = this.pressTooltipButton.bind(this)

    this.props.navigation.setParams({
      initUserDetail: this.getUserInfoDetail,
      initPubList: this.props.getPubList,
      initBeerList: this.props.getBeerList,
    })
  }
  static navigationOptions = ({ navigation }) => ({
    tabBarOnPress: (scene, jumpToIndex) => {
      if (!scene || !scene.focused) {
        navigation.state.params.initUserDetail()
        navigation.state.params.initPubList()
        navigation.state.params.initBeerList()
      }
      jumpToIndex(scene.index)
    },
  })

  getUserInfoDetail() {
    if (this.props.auth.signedUpUser) {
      this.props.getUserDetail(this.props.auth.signedUpUser._id)
    }
  }

  goDetail(isBeer, _id) {
    const page = isBeer ? 'BeerDetail' : 'PubDetail'
    this.props.navigation.navigate(page, { _id })
  }

  changeShowPage(page) {
    this.setState({ showPage: page })
  }

  pressTooltipButton(status) {
    this.setState({ tooltipOn: status })
  }

  render() {
    const auth = this.props.auth

    if (auth.signedUpUser) {
      return (
        <ScrollView style={{ minHeight: height, }}>
          <MyHeaderComponent
            pressTooltipButton={this.pressTooltipButton}
            tooltipOn={this.state.tooltipOn} />
          <MyContextComponent
            auth={this.props.auth}
            goDetail={this.goDetail}
            changeProfile={this.props.changeProfile} />
          <MyTapComponent
            showPage={this.state.showPage}
            changeShowPage={this.changeShowPage} />
          {
            this.state.tooltipOn ? (
              <MyTooltip
                platform={this.props.auth.platform}
                googleLogout={this.props.onGoogleLogout}
                facebookLogout={this.props.onFbLogout}
                pressTooltipButton={this.pressTooltipButton}
                navigation={this.props.navigation}
              />
            ) : null
          }
          <View style={{ marginBottom: 86, }}>
            {
              this.state.showPage === 'feed' ? (
                <MyFeed
                  auth={this.props.auth}
                  deleteFeed={this.props.deleteFeed}
                  navigation={this.props.navigation} />
              ) : this.state.showPage === 'pub' ? (
                <MyPub
                  auth={this.props.auth}
                  pubList={this.props.pubList}
                  navigation={this.props.navigation} />
              ) : this.state.showPage === 'beer' ? (
                <MyBeer
                  auth={this.props.auth}
                  beerList={this.props.beerList}
                  navigation={this.props.navigation} />
              ) : null
            }
          </View>
        </ScrollView>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', marginTop: 70, }}>
        <ActivityIndicator
          animating={!auth.signedUpUser}
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
  feedList: state.feedData.feedList,
  pubList: state.pubData.pubList,
  beerList: state.beerData.beerList,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(My)
