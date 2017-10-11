import React, { Component } from 'react'
import { Image } from 'react-native'

import { TabNavigator } from 'react-navigation'

import FeedList from '../container/feed/feedList'
import FeedMap from '../container/feed/feedMap'


export default TabNavigator({
  FeedList: {
    screen: FeedList,
    navigationOptions: { tabBarLabel: '목록으로 보기' }
  },
  FeedMap: {
    screen: FeedMap,
    navigationOptions: { tabBarLabel: '지도로 보기' }
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: false,
  swipeEnabled: false,
  lazy: false,
  backBehavior: false,
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#bcbcbc',
    showIcon: false,
    tabStyle: {
      flexDirection: 'column',
      height: 40,
    },
    labelStyle: {
      fontSize: 14,
    },
    indicatorStyle: {
      backgroundColor: '#fff',
    },
    style: {
      backgroundColor: '#eea51b',
    }
  },
})
