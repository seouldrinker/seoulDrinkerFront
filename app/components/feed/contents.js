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
          <Image source={require('../../images/feed/feed_place.png')}
            style={{ width: 18, height: 22, }}/>
          <TouchableOpacity onPress={() => {
            if (this.props.nav.routes[this.props.nav.index].routeName !== 'PubDetail') {
              this.props.navigation.navigate('PubDetail', { _id: this.props.pub._id })
            }
          }}>
            <Text style={ styles.feedContentsPub }>{this.props.pub.kor_name || this.props.pub.eng_name }</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.feedContentsBeerContainer }>
          <Image source={require('../../images/feed/feed_beer.png')}
            style={{ marginTop: 4, width: 18, height: 22, }} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', }}>
            {
              this.props.beers.map((v, k) => {
                return (
                  <TouchableOpacity key={ k } style={{ marginLeft: 14, }}
                    onPress={() => {
                      if (this.props.nav.routes[this.props.nav.index].routeName !== 'BeerDetail') {
                        this.props.navigation.navigate('BeerDetail', { _id: v._id })
                      }
                    }}>
                    <Text style={ styles.feedContentsBeer }>{ v.kor_name || v.eng_name }</Text>
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
