import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class ChoicedPub extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ width, height: 66, borderBottomWidth: 2, borderBottomColor: '#e1e1e1' }}>
        {
          this.props.newPub ? (
            <TouchableOpacity onPress={() => { this.props.setPubModalVisible(true) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Image style={{ width: 18, height: 22, margin: 20 }} source={require('../../images/feed/feed_place.png')} />
                <View style={{ marginTop: 12, flex: 3 }}>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16
                  }}>{this.props.newPub.kor_name}</Text>
                  <Text style={{ marginTop: 2, color: '#949494',
                    fontWeight: '200', fontSize: 12
                  }}>{this.props.newPub.location}</Text>
                </View>
                <Image style={{ width: 7, height: 11, margin: 22, marginTop: 26 }} source={require('../../images/record/right.png')} />
              </View>
            </TouchableOpacity>
          ) :
          (
            <TouchableOpacity onPress={() => { this.props.setPubModalVisible(true) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Image style={{ width: 18, height: 22, margin: 20 }} source={require('../../images/feed/feed_place.png')} />
                <Text style={{ flex: 3, marginTop: 20, color: '#000', fontSize: 14, fontWeight: '400', fontSize: 16 }}>어디에서 맥주를 마시고 있나요?</Text>
                <Image style={{ width: 7, height: 11, margin: 22, marginTop: 26 }} source={require('../../images/record/right.png')} />
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}
