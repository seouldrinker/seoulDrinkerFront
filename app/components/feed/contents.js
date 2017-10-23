import React, { Component } from 'react'
import { TouchableOpacity, ScrollView, View, Image, Text, } from 'react-native'

import styles from '../../styles/feed'

export default class FeedContentsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <View style={ styles.feedContentsContainer }>
        <View style={ styles.feedContentsPubContainer }>
          <Image source={require('../../images/feed/feed_place.png')} />
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('PubDetail', { _id: this.props.pub._id })
          }}>
            <Text style={ styles.feedContentsPub }>{this.props.pub.kor_name || this.props.pub.eng_name }</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.feedContentsBeerContainer }>
          <Image style={{ marginTop: 4 }} source={require('../../images/feed/feed_beer.png')} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', }}>
            {
              this.props.beers.map((v, k) => {
                return (
                  <TouchableOpacity key={ k } style={{ marginLeft: 14, }}
                    onPress={() => {
                      this.props.navigation.navigate('BeerDetail', { _id: v._id })
                    }}>
                    <Text style={ styles.feedContentsBeer }>{ v.eng_name || v.kor_name }</Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
        <View style={ styles.feedContentsContextContainer }>
          <Text style={ styles.feedContentsContext }>{this.props.context}</Text>
        </View>
      </View>
    )
  }
}
