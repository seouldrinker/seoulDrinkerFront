import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import { STATIC_URL } from '../../../../config/config'
const { width, height } = Dimensions.get('window')

export default class BeerPubDetailRankComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const feedList = this.props.data._feedList
    let filteredFeedList = []
    for (let i=0 ; i < feedList.length; i=i+3) {
      filteredFeedList.push([feedList[i], feedList[i+1], feedList[i+2]])
    }

    return (
      <View style={{ paddingTop: 20, paddingBottom: 10, }}>
        <View style={{ flexDirection: 'row', paddingTop: 15,
          marginLeft: 12, marginRight: 12,
          borderTopWidth: 2, borderTopColor: '#e1e1e1', }}>
          <Image style={{ width: 12, height: 20, marginLeft: 12, marginRight: 12 }}
            source={require('../../../images/common/black_rank.png')} />
          <Text style={{ marginLeft: 15, color: '#000', fontSize: 14,
            fontWeight: '600', }}>랭킹 {this.props.rank}위</Text>
          <Text style={{ marginLeft: 12, color: '#ee741b', fontSize: 14,
            fontWeight: '600', }}>{feedList.length}번 벌컥!</Text>
        </View>
        <View style={{ marginTop: 15, }}>
          {
            filteredFeedList.map((v, k) => {
              return (
                <View key={ k } style={{ flexDirection: 'row', width,
                  marginTop: 6, }}>
                  {
                    (v[0]) ? (
                      <Image style={{ width: width/3-6, height: width/3-6,
                        marginLeft: 2, marginRight: 2, }}
                        source={{ uri: `${STATIC_URL}/${v[0].image}`}} />
                    ) : null
                  }
                  {
                    (v[1]) ? (
                      <Image style={{ width: width/3-6, height: width/3-6,
                        marginLeft: 2, marginRight: 2, }}
                        source={{ uri: `${STATIC_URL}/${v[1].image}`}} />
                    ) : null
                  }
                  {
                    (v[2]) ? (
                      <Image style={{ width: width/3-6, height: width/3-6,
                        marginLeft: 2, marginRight: 2, }}
                        source={{ uri: `${STATIC_URL}/${v[2].image}`}} />
                    ) : null
                  }
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
