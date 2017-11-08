import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class MyTapComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingTop: 34,
        borderBottomWidth: 1, borderBottomColor: '#949494', }}>
        <TouchableOpacity onPress={() => {
          this.props.changeShowPage('feed')
        }} style={[{ flex: 1, paddingBottom: 15, },
          this.props.showPage === 'feed' &&
          { borderBottomWidth: 2, borderBottomColor: '#4a4a4a' }]}>
          <Text style={[{ textAlign: 'center', fontSize: 15,
            fontWeight: '900', color: '#949494', },
            this.props.showPage === 'feed' && { color: '#000', }]}>FEED</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.props.changeShowPage('pub')
        }} style={[{ flex: 1, paddingBottom: 15, },
          this.props.showPage === 'pub' &&
          { borderBottomWidth: 2, borderBottomColor: '#4a4a4a' }]}>
          <Text style={[{ textAlign: 'center', fontSize: 15,
            fontWeight: '900', color: '#949494', },
            this.props.showPage === 'pub' && { color: '#000', }]}>PUB</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.props.changeShowPage('beer')
        }} style={[{ flex: 1, paddingBottom: 15, },
          this.props.showPage === 'beer' &&
          { borderBottomWidth: 2, borderBottomColor: '#4a4a4a' }]}>
          <Text style={[{ textAlign: 'center', fontSize: 15,
            fontWeight: '900', color: '#949494', },
            this.props.showPage === 'beer' && { color: '#000a', }]}>BEER</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
