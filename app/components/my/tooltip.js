import React, { Component } from 'react'
import {
  Alert,
  TouchableOpacity,
  View,
  Text
} from 'react-native'

export default class MyToolTip extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={{ position: 'absolute', width: 108, height: 100,
        marginRight: 6, marginTop: 54, paddingTop: 10, paddingBottom: 10,
        top: 0, right: 0, backgroundColor: '#fff', elevation: 8, }}>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Seoul Drinker',
            '정말 로그아웃 하시겠습니까?',
            [
              {text: 'OK', onPress: () => {
                if (this.props.platform === 'google') {
                  this.props.googleLogout()
                } else {
                  this.props.facebookLogout()
                }
                this.props.pressTooltipButton(false)
                this.props.navigation.navigate('Login')
              }},
              {text: 'Cancel', onPress: () => {
                this.props.pressTooltipButton(false)
              }, style: 'cancel'},
            ],
            { cancelable: true }
          )
        }}
          style={{ alignItems: 'center', height: 41, paddingTop: 10, }}
        >
          <Text style={{ color: '#000', }}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            this.props.pressTooltipButton(false)
          }}
          style={{ alignItems: 'center', height: 41, paddingTop: 10, }}
        >
          <Text style={{ color: '#000', }}>취소</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
