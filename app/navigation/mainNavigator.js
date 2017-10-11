import React, { Component } from 'react'
import { Image } from 'react-native'

import { TabNavigator } from 'react-navigation'

import FeedNavigator from './FeedNavigator'
import Pub from '../container/pub'
import Record from '../container/record'
import Beer from '../container/beer'
import My from '../container/my'

import styles from '../styles/common'


export default TabNavigator({
  Feed: {
    screen: FeedNavigator,
    navigationOptions: {
      tabBarLabel: '피드',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/feed/feed.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  Pub: {
    screen: Pub,
    navigationOptions: {
      tabBarLabel: '펍',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/feed/pub.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  Record: {
    screen: Record,
    navigationOptions: {
      tabBarLabel: '기록',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/feed/record.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  Beer: {
    screen: Beer,
    navigationOptions: {
      tabBarLabel: '비어',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/feed/beer.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
  My: {
    screen: My,
    navigationOptions: {
      tabBarLabel: '마이',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../images/feed/my.png')}
          style={[styles.naviIcon, {tintColor: tintColor}]}
        />
      ),
    }
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
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
    }
  },
})
