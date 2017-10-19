import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class ChoicedBeer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ width, height: 66, }}>
        {
          (this.props.newBeers && this.props.newBeers.length > 0) ? (
            this.props.newBeers.map((v, k) => {
              return (
                <TouchableOpacity key={k} onPress={() => { this.props.setBeerModalVisible(true) }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Image style={{ width: 20, height: 22, margin: 20 }} source={require('../../images/feed/feed_beer.png')} />
                    <Text style={{ flex: 3, marginTop: 20, color: '#000', fontSize: 14, fontWeight: '400', fontSize: 16 }}>#{v.kor_name}</Text>
                    <Image style={{ width: 7, height: 11, margin: 22, marginTop: 26 }} source={require('../../images/record/right.png')} />
                  </View>
                </TouchableOpacity>
              )
            })
          ) : (
            <TouchableOpacity onPress={() => { this.props.setBeerModalVisible(true) }}>
              <View style={{ flexDirection: 'row', }}>
                <Image style={{ width: 20, height: 22, margin: 20 }} source={require('../../images/feed/feed_beer.png')} />
                <Text style={{ flex: 3, marginTop: 20, color: '#000', fontSize: 14, fontWeight: '400', fontSize: 16 }}>어떤 맥주를 마시고 있나요?</Text>
                <Image style={{ width: 7, height: 11, margin: 22, marginTop: 26 }} source={require('../../images/record/right.png')} />
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}
