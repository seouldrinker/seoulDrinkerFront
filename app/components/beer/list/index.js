import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, } from 'react-native'

import { STATIC_URL } from '../../../../config/config'

export default class BeerComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 14, paddingBottom: 14,
        paddingLeft: 16, borderBottomWidth: 1, borderBottomColor: '#d8d8d8'}}
        onPress={this.props.navigateDetailPage}>
        <View>
          <Image style={{ width: 56, height: 56, marginLeft: 12, marginRight: 12 }}
            source={{ uri: `${STATIC_URL}/${this.props.data.image}` }} />
        </View>
        <View style={{ marginLeft: 4,  }}>
          <Text style={{ fontSize: 15, fontWeight: '900', color: '#000' }}>{this.props.data.eng_name}</Text>
          <Text style={{ fontSize: 15, fontWeight: '900', color: '#000',
            marginTop: 2, }}>{this.props.data.kor_name}</Text>
          <View style={{ flexDirection: 'row', marginTop: 2,  }}>
            <Text style={{ fontWeight: '400', color: '#949494' }}>Style : {this.props.data.style}</Text>
            <Text style={{ fontWeight: '400', color: '#949494',
              marginLeft: 16, }}>ABV : {this.props.data.abv}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
