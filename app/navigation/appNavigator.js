import React, { Component } from 'react'
import { Image, TouchableOpacity, PropTypes } from 'react-native'
import { StackNavigator, NavigationActions, addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'

import mainNavigator from './mainNavigator'
import Login from '../container/login'
import Rank from '../container/rank'
import News from '../container/news'

export const AppNavigator = StackNavigator({
  Home: {
    screen: mainNavigator,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: <Image
        source={require('../images/common/logo.png')}
        style={{ width: 156, height: 28, alignSelf: 'center', }}/>,
      headerLeft: <Image
        source={require('../images/common/news.png')}
        style={{marginLeft: 20}}/>,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.navigate({
          routeName: 'Login',
        }))}>
          <Image style={{marginRight: 25}}
            source={require('../images/common/rank.png')}/>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#eea51b',
        elevation: 0,
      }
    })
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Rank: {
    screen: Rank,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: <Image
        source={require('../images/common/logo.png')}
        style={{ width: 90, height: 39 }}/>,
      headerStyle: {
        backgroundColor: '#eea51b',
      }
    })
  },
  News: {
    screen: News,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: <Image
        source={require('../images/common/logo.png')}
        style={{ width: 90, height: 39 }}/>,
      headerStyle: {
        backgroundColor: '#eea51b',
      }
    })
  },
})


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)
