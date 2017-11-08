import React, { Component } from 'react'
import {
  Image,
  TouchableOpacity,
  BackHandler,
  Text,
} from 'react-native'
import { StackNavigator, NavigationActions, addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MainNavigator from './mainNavigator'
import Login from '../container/login'
import Record from '../container/record'
import PubRank from '../container/rank/pubRank'
import BeerRank from '../container/rank/beerRank'
import PubDetail from '../container/pub/pubDetail'
import BeerDetail from '../container/beer/beerDetail'

import * as actions from '../actions'

export const AppNavigator = StackNavigator({
  Home: {
    screen: MainNavigator,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Record: {
    screen: Record,
  },
  PubRank: {
    screen: PubRank,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>Pub Ranking</Text>,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee741b',
        elevation: 0,
      }
    })
  },
  BeerRank: {
    screen: BeerRank,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>Beer Ranking</Text>,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#ee741b',
        elevation: 0,
      }
    })
  },
  PubDetail: {
    screen: PubDetail,
    navigationOptions: {
      header: null
    }
  },
  BeerDetail: {
    screen: BeerDetail,
    navigationOptions: {
      header: null
    }
  },
})


class AppWithNavigationState extends Component {
  constructor(props) {
    super(props)
    this.handleBackPress = this.handleBackPress.bind(this)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  handleBackPress () {
    const routes = this.props.nav.routes

    if (this.props.nav.routes.length <= 3
      || routes[this.props.nav.index].routeName === 'Home'
      || routes[this.props.nav.index].routeName === 'Feed'
      || routes[this.props.nav.index].routeName === 'Login') {
      return false
    }

    this.props.dispatch({ type: 'Navigation/BACK', key: null, })
    return true
  }

  render() {
    return <AppNavigator navigation={addNavigationHelpers(
      { dispatch: this.props.dispatch, state: this.props.nav }
    )} />
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
}))(AppWithNavigationState)
