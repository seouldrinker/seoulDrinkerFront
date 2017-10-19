import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { STATIC_URL } from '../../../../config/config'

export default class PubComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 14, paddingBottom: 14,
        paddingLeft: 10, borderBottomWidth: 1, borderBottomColor: '#d8d8d8'}}
        onPress={this.props.navigateDetailPage}>
        <View>
          <Image style={{ width: 56, height: 56, marginLeft: 12, marginRight: 12 }}
            source={{ uri: `${STATIC_URL}/${this.props.data.brewery.logo_image}` }} />
        </View>
        <View style={{ marginLeft: 4,  }}>
          <Text style={{ fontSize: 15, fontWeight: '900', color: '#000' }}>{this.props.data.brewery.eng_name}</Text>
          <Text style={{ fontSize: 15, fontWeight: '900', color: '#000',
            marginTop: 2, }}>{this.props.data.brewery.kor_name}</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#949494',
            marginTop: 2, }}>{this.props.data.location}</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#949494',
            marginTop: 2, }}>{this.props.data.phone}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
