import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class MyHeaderComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff',
        height: 56, elevation: 0, }}>
        <Text style={{ flex: 16, marginTop: 16, marginLeft: 28,
          color: '#000', fontSize: 18, fontWeight: '500', }}>My</Text>
        <TouchableOpacity style={{ flex: 2, marginTop: 20, }} onPress={() =>{
            this.props.pressTooltipButton(!this.props.tooltipOn)
          }}>
          <Image style={{ width: 4, height: 20, }}
            source={require('../../images/feed/more.png')}/>
        </TouchableOpacity>
      </View>
    )
  }
}
