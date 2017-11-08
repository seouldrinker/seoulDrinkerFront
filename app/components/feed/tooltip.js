import React, { Component } from 'react'
import { Alert, TouchableOpacity, View, Text } from 'react-native'

export default class FeedToolTip extends Component {
  constructor (props) {
    super(props)

    this.goModifyPage = this.goModifyPage.bind(this)
  }

  goModifyPage() {
    this.props.navigation.navigate('Record', { data: this.props.data, })
  }

  render () {
    return (
      <View style={{ position: 'absolute', width: 110, height: 144,
        marginRight: 6, marginTop: 54, paddingTop: 10, paddingBottom: 10,
        top: 0, right: 0, backgroundColor: '#fff', elevation: 8, }}>
        <TouchableOpacity onPress={() => {
          this.goModifyPage()
          this.props.pressTooltipButton(false)
        }}
          style={{ alignItems: 'center', height: 41, paddingTop: 10, }}
        >
          <Text style={{ color: '#000', }}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Seoul Drinker',
            '정말 지우시겠습니까?',
            [
              {text: 'OK', onPress: () => {
                this.props.deleteFeed(this.props.data._id)
                this.props.pressTooltipButton()
              }},
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            ],
            { cancelable: true }
          )
        }}
          style={{ alignItems: 'center', height: 41, paddingTop: 10, }}
        >
          <Text style={{ color: '#000', }}>삭제</Text>
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
