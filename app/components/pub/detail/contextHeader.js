import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Linking,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import { STATIC_URL } from '../../../../config/config'
const { width, height } = Dimensions.get('window')

export default class PubDetailContextHeaderComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const pub = this.props.data

    return (
      <View style={{ marginLeft: 12, marginRight: 12,
          marginTop: 15, marginBottom: 15,
          borderTopWidth: 1, borderTopColor: '#e1e1e1' }}>
        {
          (pub.location) ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start',
              marginTop: 12, }}>
              <Image style={{ width: 14, height: 20, marginTop: 2,
                  marginLeft: 8, }}
                source={require('../../../images/pub/location.png')} />
              <Text style={{ marginLeft: 16, fontWeight: '800', color: '#000', }}>
                {pub.location}
              </Text>
            </View>
          ) : null
        }
        {
          (pub.brewery.phone) ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start',
            marginTop: 12, }}>
              <Image style={{ width: 22, height: 22, marginTop: 4,
                marginLeft: 8, }}
                source={require('../../../images/pub/phone.png')} />
              <Text style={{ marginLeft: 16, fontWeight: '800', color: '#000', }}>{pub.brewery.phone}</Text>
            </View>
          ) : null
        }
        {
          (pub.brewery.homepage) ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start',
            marginTop: 12, }}>
              <Image style={{ width: 22, height: 18, marginTop: 4,
                  marginLeft: 8, }}
                source={require('../../../images/pub/site.png')} />
              <Text style={{ marginLeft: 16, fontWeight: '800', color: '#000', }}
                onPress={() => Linking.openURL(`${pub.brewery.homepage}`)}>
                {pub.brewery.homepage}
              </Text>
            </View>
          ) : null
        }
        {
          (pub.brewery.est) ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start',
            marginTop: 12, }}>
              <Image style={{ width: 18, height: 20, marginTop: 2,
                  marginLeft: 8, }}
                source={require('../../../images/pub/create.png')} />
              <Text style={{ marginLeft: 16, fontWeight: '800', color: '#000', }}>{pub.brewery.est}</Text>
            </View>
          ) : null
        }
        {
          (pub.brewery.facebook || pub.brewery.facebook) ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start',
              marginTop: 12, }}>
              <Image style={{ width: 22, height: 11, marginTop: 6,
                  marginLeft: 8, }}
                source={require('../../../images/pub/sns.png')} />
              <View style={{ marginLeft: 16, flexDirection: 'row' }}>
                {
                  pub.brewery.facebook ? (
                    <Text style={{ color: '#eea51b', fontWeight: '800' }}
                      onPress={() => Linking.openURL(`${pub.brewery.facebook}`)}>
                      Facebook
                    </Text>
                  ) : null
                }
                {
                  pub.brewery.instagram ? (
                    <Text style={[ !!pub.brewery.facebook && { marginLeft: 12 },
                      { color: '#eea51b', fontWeight: '800' }]}
                      onPress={() => Linking.openURL(`${pub.brewery.instagram}`)}>
                      Instagram
                    </Text>
                  ) : null
                }
              </View>
            </View>
          ) : null
        }
      </View>
    )
  }
}
