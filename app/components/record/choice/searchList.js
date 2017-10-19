import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

const { width, height } = Dimensions.get('window')

import { STATIC_URL } from '../../../../config/config'

export default class SearchHeader extends Component {
  constructor(props) {
    super(props)
  }

  setItemChoice (v, k) {
    let tempItemIds = this.props.choicedItems

    if (this.props.isBeer) {
      if (tempItemIds && tempItemIds.includes(v._id)) {
        tempItemIds = tempItemIds.filter((v1, k1) => {
          return v1 != v._id
        })
      } else {
        tempItemIds.push(v._id)
      }
    } else {
      tempItemIds = (tempItemIds && (tempItemIds === v._id)) ? null : v._id
    }
    this.props.setChangedItems(tempItemIds)
  }

  render() {
    const default_image = this.props.isBeer ?
      require('../../../images/record/default_beer.png'):
      require('../../../images/record/default_pub.png')

    return (
      <ScrollView style={{ marginTop: 18 }}>
        <TouchableOpacity style={{}}
          onPress={() => {

          }}>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10,
            marginTop: 4, marginBottom: 4, }}>
            <Image style={{ width: 56, height: 56, marginLeft: 12, marginRight: 12 }}
              source={default_image} />
            <View style={{ marginTop: 8, marginLeft: 10 }}>
              <Text style={{ color: '#000', fontWeight: '600', }}>
                {
                  this.props.isBeer ? (
                    '어떤 맥주'
                  ) : (
                    '서울 어딘가'
                  )
                }
              </Text>
              <Text style={{ marginTop: 2, fontSize: 14 }}>
                {
                  this.props.isBeer ? (
                    '아래 목록에 없는 어떤 맛있는 맥주'
                  ) : (
                    '아래 목록에 없는 어떤 멋진 펍!'
                  )
                }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {
          this.props.itemList.map((v, k) => {
            const isChoice = (this.props.isBeer ?
              this.props.choicedItems && (this.props.choicedItems.includes(v._id)) :
              this.props.choicedItems && (this.props.choicedItems === v._id))
            const itemImage = (this.props.isBeer ? v.image : v.brewery.logo_image)
            return (
              <TouchableOpacity key={ k } style={ isChoice && { backgroundColor: 'rgba(238, 165, 27, 0.2)' }}
                onPress={ this.setItemChoice.bind(this, v, k) }>
                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10,
                  marginTop: 6, marginBottom: 6, }}>
                  <Image style={{ width: 56, height: 56, marginLeft: 12, marginRight: 12 }}
                    source={{ uri: `${STATIC_URL}/${itemImage}` }} />
                  <View style={{ marginTop: 16, marginLeft: 10 }}>
                    <Text style={{ color: '#000', fontWeight: '600', }}>#{v.kor_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    )
  }
}
