import React, { Component } from 'react'
import { Image } from 'react-native'

import { TabNavigator } from 'react-navigation'

import Feed from '../container/feed'
import Pub from '../container/pub'
import News from '../container/news'
import Beer from '../container/beer'
import My from '../container/my'

import styles from '../styles/common'


export default TabNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: '피드',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/common/feed.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  Pub: {
    screen: Pub,
    navigationOptions: {
      header: null,
      tabBarLabel: '펍',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/common/pub.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  Beer: {
    screen: Beer,
    navigationOptions: {
      header: null,
      tabBarLabel: '비어',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/common/beer.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  News: {
    screen: News,
    navigationOptions: {
      header: null,
      tabBarLabel: '뉴스',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/common/news.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  My: {
    screen: My,
    navigationOptions: {
      header: null,
      tabBarLabel: '마이',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/common/my.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  lazy: false,
  backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: '#eea51b',
    inactiveTintColor: '#bcbcbc',
    showIcon: true,
    tabStyle: {
      flexDirection: 'column',
      height: 54,
      marginTop: 8,
    },
    labelStyle: {
      fontSize: 10,
      marginTop: 5,
    },
    indicatorStyle: {
      backgroundColor: '#fff',
    },
    style: {
      backgroundColor: '#fff',
    },
  },
})
