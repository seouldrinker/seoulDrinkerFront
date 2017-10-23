import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

export default class RankComponent extends Component {
  constructor(props) {
    super(props)

    this.goDetail = this.goDetail.bind(this)
  }

  goDetail() {
    const target = this.props.isBeer ? 'BeerDetail' : 'PubDetail'
    const data = this.props.isBeer ? this.props.rank.beer : this.props.rank.pub
    this.props.navigation.navigate(target, { _id: data._id })
  }

  render() {
    const data = this.props.isBeer ? this.props.rank.beer : this.props.rank.pub
    return (
      <TouchableOpacity style={{ flexDirection: 'row', marginTop: 6, marginBottom: 6, }}
        onPress={this.goDetail}>
        <Text style={[{ flex: 1, marginTop: 14, marginLeft: 18, color: '#000',
          fontSize: 14, fontWeight: '800', }, (this.props.rank.rank === 1) && {color: '#ee741b', }]}>{
            this.props.rank.rank === 0 ? '-' : this.props.rank.rank
          }</Text>
        <Image style={[{ width: 56, height: 56, marginLeft: 15,
          borderRadius: 56, }, (this.props.rank.rank === 1) && {borderWidth: 3, borderColor: '#ee741b'}]}
          source={{ uri: `${STATIC_URL}/${data.brewery.brand_image}` }} />
        <View style={{ flex: 13,
          marginTop: 10, marginLeft: 15 }}>
        {
          this.props.isBeer ? (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <Text style={{ color: '#000', marginTop: 8,
                fontSize: 14, fontWeight: '900' }}>
                #{data.kor_name}
              </Text>
            </ScrollView>
          ) : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View>
                <Text style={{ color: '#000', fontSize: 14, fontWeight: '900' }}>
                  {data.brewery.kor_name} {data.kor_name}
                </Text>
                <Text style={{ color: '#949494', fontSize: 14, fontWeight: '600' }}>
                  {data.location}
                </Text>
              </View>
            </ScrollView>
          )
        }
        </View>
        <Text style={{ flex: 6, textAlign: 'right', color: '#4a4a4a',
          marginTop: 20, marginRight: 25, fontSize: 14, fontWeight: '600', }}>{data.feedCount}번 벌컥</Text>
      </TouchableOpacity>
    )
  }
}
