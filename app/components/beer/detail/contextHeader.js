import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Linking,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import { STATIC_URL } from '../../../../config/config'
const { width, height } = Dimensions.get('window')

export default class BeerDetailContextHeaderComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const beer = this.props.data
    return (
      <View style={{ marginLeft: 12, marginRight: 12,
          marginTop: 15, marginBottom: 15,
          borderTopWidth: 1, borderTopColor: '#e1e1e1' }}>
        {
          (beer.feature) ? (
            <View style={{ flexDirection: 'row', marginTop: 12, }}>
              <Text style={{ marginLeft: 4, color: '#949494', fontWeight: '800', }}>
                특징
              </Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                style={{ flexDirection: 'row', marginLeft: 28, }}>
                <Text style={{ fontWeight: '800', color: '#000', }}>
                  {beer.feature}
                </Text>
              </ScrollView>
            </View>
          ) : null
        }
        {
          (beer.style) ? (
            <View style={{ flexDirection: 'row', marginTop: 12, }}>
              <Text style={{ marginLeft: 4, color: '#949494', fontWeight: '800', }}>
                스타일
              </Text>
              <Text style={{ marginLeft: 16, fontWeight: '800', color: '#000', }}>{beer.style}</Text>
            </View>
          ) : null
        }
        {
          (beer.release) ? (
            <View style={{ flexDirection: 'row', marginTop: 12, }}>
              <Text style={{ marginLeft: 4, color: '#949494', fontWeight: '800', }}>
                출시일
              </Text>
              <Text style={{ marginLeft: 16, fontWeight: '800', color: '#000', }}
                onPress={() => Linking.openURL(`${beer.release}`)}>
                {beer.release}
              </Text>
            </View>
          ) : null
        }
        {
          (beer.abv) ? (
            <View style={{ flexDirection: 'row', marginTop: 12, }}>
              <Text style={{ marginLeft: 4, color: '#949494', fontWeight: '800', }}>
                ABV
              </Text>
              <Text style={{ marginLeft: 28, fontWeight: '800', color: '#000', }}>{beer.abv}</Text>
            </View>
          ) : null
        }
      </View>
    )
  }
}
