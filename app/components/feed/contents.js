import React, { Component } from 'react'
import { TouchableOpacity, View, Image, Text, } from 'react-native'

import styles from '../../styles/feed'

export default class FeedContentsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <View style={ styles.feedContentsContainer }>
        <View style={ styles.feedContentsPubContainer }>
          <Image source={require('../../images/feed/feed_beer.png')} />
          <TouchableOpacity>
            <Text style={ styles.feedContentsPub }>{this.props.pub.kor_name || this.props.pub.eng_name }</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.feedContentsBeerContainer }>
          <Image style={{ marginTop: 4 }} source={require('../../images/feed/feed_place.png')} />
          <View style={{ flexDirection: 'row', }}>
            {
              this.props.beers.map((v, k) => {
                return (
                  <TouchableOpacity key={ k } style={{ marginLeft: 14, }}>
                    <Text style={ styles.feedContentsBeer }>{ v.eng_name || v.kor_name }</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
        <View style={ styles.feedContentsContextContainer }>
          <Text style={ styles.feedContentsContext }>{this.props.context}</Text>
        </View>
      </View>
    )
  }
}
