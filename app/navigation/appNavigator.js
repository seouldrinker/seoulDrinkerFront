import React, { Component } from 'react'
import {
  Image,
  TouchableOpacity,
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
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: (
        <Image source={require('../images/common/logo.png')}
          style={{ width: 156, height: 28, alignSelf: 'center', }}/>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.navigate({
            routeName: 'Record',
          }))}>
          <Image source={require('../images/common/record.png')}
            style={{ marginLeft: 20, }}/>
        </TouchableOpacity>
      ),
      headerRight: (
        <Text style={{ marginRight: 25 }}></Text>
      ),
      headerStyle: {
        backgroundColor: '#eea51b',
        elevation: 8,
      }
    })
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


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
}))(AppWithNavigationState)
