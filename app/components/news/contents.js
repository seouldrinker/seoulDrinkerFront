import React, { Component } from 'react'
import { TouchableOpacity, View, Image, Text, } from 'react-native'

import styles from '../../styles/news'

export default class NewsContentsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <View style={ styles.newsContentsContainer }>
        <Text style={ styles.newsContents }>{this.props.context}</Text>
      </View>
    )
  }
}
