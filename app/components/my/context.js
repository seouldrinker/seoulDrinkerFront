import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import { STATIC_URL} from '../../../config/config'
const { width, height } = Dimensions.get('window')

export default class MyContextComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSource: null,
    }
  }

  selectProfile() {
    const _this = this
    ImagePicker.launchImageLibrary({
      quality: 1.0,
      maxWidth: Math.ceil(width) + 100,
      maxHeight: Math.ceil(width) + 100,
    }, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const data = new FormData()
        data.append('profile', {
          uri: response.uri,
          type: response.type || 'image/jpeg',
          name: this.props.auth.signedUpUser ?
            this.props.auth.signedUpUser._id : null,
        })

        this.props.changeProfile(this.props.auth.signedUpUser._id, data, () => {
          _this.setState({
            imageSource: {
              uri: response.uri || null,
              type: response.type || null,
            }
          })
        })
      }
    })
  }

  render() {
    const auth = this.props.auth
    let name = 'noName'
    let feedCount = 0
    let profileImage = require('../../images/feed/default_profile.png')
    let maxPubId = '0'
    let maxPubName = 'noPub'
    let maxBeerId = '0'
    let maxBeerName = 'noBeer'

    if (auth.signedUpUser) {
      name = auth.signedUpUser.name ? auth.signedUpUser.name : 'no name'
      feedCount = auth.feedList ? auth.feedList.length : 0
      if (this.state.imageSource && this.state.imageSource.uri) {
        profileImage = { uri: this.state.imageSource.uri }
      } else {
        profileImage = auth.signedUpUser.picture ?
          auth.signedUpUser.picture.split('http').length < 2 ?
            { uri: `${STATIC_URL}/${auth.signedUpUser.picture}` } :
            { uri: `${auth.signedUpUser.picture}` } :
          require('../../images/feed/default_profile.png')
      }

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
          <TouchableOpacity onPress={this.selectProfile.bind(this)}>
            <Image style={{ width: 80, height: 80, borderRadius: 80, }}
              source={profileImage}/>
          </TouchableOpacity>

          <View style={{ marginTop: 12, marginLeft: 20, }}>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: '800', }}>
              {name}
            </Text>
            {
              feedCount === 0 ? (
                <Text style={{ marginTop: 4, color: '#4a4a4a', fontSize: 14,
                  fontWeight: '400' }}>
                  벌컥 해주세요!
                </Text>
              ) : (
                <Text style={{ marginTop: 4, color: '#4a4a4a', fontSize: 14,
                  fontWeight: '400' }}>
                  총 {feedCount}번 벌컥!
                </Text>
              )
            }
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20, }}>
          <Image style={{ width: 16, height: 22, }}
            source={require('../../images/feed/feed_place.png')}/>
          {
            maxPubName === 'noPub' ? (
              <Text style={{ marginLeft: 16, color: '#000', fontWeight: '400',
              }}>
                첫 번째 수제 맥주 펍을 방문해 보세요.
              </Text>
            ) : (
              <View style={{ flexDirection: 'row', }}>
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
            )
          }
        </View>
        <View style={{ flexDirection: 'row', marginTop: 8, }}>
          <Image style={{ width: 18, height: 18, marginTop: 4, }}
            source={require('../../images/feed/feed_beer.png')}/>
          {
            maxBeerName === 'noBeer' ? (
              <Text style={{ padding: 2, marginTop: 0, marginLeft: 12,
                color: '#000', fontWeight: '400', }}>
                첫 번째 수제 맥주를 마셔 보세요.
              </Text>
            ) : (
              <View style={{ flexDirection: 'row', }}>
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
            )
          }
        </View>
      </View>
    )
  }
}
