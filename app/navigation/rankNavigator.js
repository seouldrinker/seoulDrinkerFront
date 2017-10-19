import React, { Component } from 'react'
import { Image } from 'react-native'

import { TabNavigator } from 'react-navigation'

import PubRank from '../container/rank/pubRank'
import BeerRank from '../container/rank/beerRank'


export default TabNavigator({
  PubRank: {
    screen: PubRank,
    navigationOptions: { tabBarLabel: 'Pub' }
  },
  BeerRank: {
    screen: BeerRank,
    navigationOptions: { tabBarLabel: 'Beer' }
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: false,
  swipeEnabled: false,
  lazy: false,
  tabBarOptions: {
    upperCaseLabel: false,
    activeTintColor: '#fff',
    inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
    showIcon: false,
    tabStyle: {
      flexDirection: 'column',
      height: 40,
    },
    labelStyle: {
      fontSize: 16,
    },
    indicatorStyle: {
      backgroundColor: '#fff',
    },
    style: {
      backgroundColor: '#ee741b',
    }
  },
})
