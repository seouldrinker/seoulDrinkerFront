import React, { Component } from 'react'
import { TouchableOpacity, View, ListView, Image, Text } from 'react-native'

import { makeTimer } from '../common'

import styles from '../../styles/news'

export default class NewsHeaderComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={ styles.newsHeaderContainer }>
        <View style={ styles.newsHeaderImageContainer }>
          <Image
            style={ styles.newsHeaderImage }
            source={require('../../images/news/admin.png')} />
        </View>
        <View style={ styles.newsHeaderContentsContainer }>
          <Text style={ styles.newsHeaderContentsName }>서울 드링커</Text>
          <Text style={ styles.newsHeaderContentsDate }>{makeTimer(this.props.date)}</Text>
        </View>
      </View>
    )
  }
}
