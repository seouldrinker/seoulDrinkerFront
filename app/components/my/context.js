import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class MyContextComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const auth = this.props.auth
    let name = 'no name'
    let feedCount = 0
    let profileImage = require('../../images/feed/default_profile.png')
    let maxPubId = '0'
    let maxPubName = 'no pub'
    let maxBeerId = '0'
    let maxBeerName = 'no beer'

    if (auth.signedUpUser) {
      name = auth.signedUpUser.name ? auth.signedUpUser.name : 'no name'
      feedCount = auth.feedList ? auth.feedList.length : 0
      profileImage = auth.signedUpUser.picture ?
        { uri: `${auth.signedUpUser.picture}` } :
        require('../../images/feed/default_profile.png')

      if (auth.beerCounter && auth.pubCounter) {
        const pubCounterKeys = Object.keys(auth.pubCounter)
        const beerCounterKeys = Object.keys(auth.beerCounter)
        let maxPubCount = 0
        let maxBeerCount = 0

        pubCounterKeys.map((v, k) => {
          if (auth.pubCounter[v].count > maxPubCount) {
            maxPubId = v
            maxPubName = auth.pubCounter[v].pub.kor_name
            maxPubCount = auth.pubCounter[v].count
          }
        })
        beerCounterKeys.map((v, k) => {
          if (auth.beerCounter[v].count > maxBeerCount) {
            maxBeerId = v
            maxBeerName = auth.beerCounter[v].beer.kor_name
            maxBeerCount = auth.beerCounter[v].count
          }
        })
      }
    }

    return (
      <View style={{ backgroundColor: '#fff', paddingTop: 25, paddingLeft: 18, }}>
        <View style={{ flexDirection: 'row', }}>
          <Image style={{ width: 80, height: 80, borderRadius: 80, }}
            source={profileImage}/>
          <View style={{ marginTop: 12, marginLeft: 20, }}>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: '800', }}>
              {name}
            </Text>
            <Text style={{ marginTop: 4, color: '#4a4a4a', fontSize: 14,
              fontWeight: '400' }}>
              총 {feedCount}번 벌컥!
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20, }}>
          <Image style={{ width: 16, height: 22, }}
            source={require('../../images/feed/feed_place.png')}/>
          <TouchableOpacity onPress={() =>{
              this.props.goDetail(false, maxPubId)
            }}>
            <Text style={{ marginLeft: 12, color: '#000', fontWeight: '800',
            }}>
              {maxPubName}
            </Text>
          </TouchableOpacity>
          <Text>에서 가장 많이 벌컥!</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 8, }}>
          <Image style={{ width: 18, height: 18, marginTop: 4, }}
            source={require('../../images/feed/feed_beer.png')}/>
          <TouchableOpacity onPress={() =>{
              this.props.goDetail(true, maxBeerId)
            }}>
            <Text style={{ padding: 2, marginTop: 0, marginLeft: 12,
              color: '#000', fontWeight: '400',
              backgroundColor: 'rgba(238, 165, 27, 0.25)', }}>
              #{maxBeerName}
            </Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 2, }}>를 가장 많이 벌컥!</Text>
        </View>
      </View>
    )
  }
}
