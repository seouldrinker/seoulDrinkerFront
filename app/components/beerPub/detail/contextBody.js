import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native'

import { STATIC_URL } from '../../../../config/config'
const { width, height } = Dimensions.get('window')

export default class BeerPubDetailContextBodyComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props.data
    return (
      <View style={{ marginLeft: 12, marginRight: 12, }}>
        <View style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 8,
            borderTopWidth: 2, borderTopColor: '#e1e1e1',
          }}>
          <Text style={{ color: '#4a4a4a', fontSize: 18, fontWeight: '600',
            }}>ABOUT</Text>
          <Text style={{ marginTop: 10, lineHeight: 26, }}>
            { !this.props.isBeer ? data.brewery.about : data.about }
          </Text>
        </View>
        {
          !this.props.isBeer ? (
            <View style={{ padding: 15, paddingLeft: 8,
              borderTopWidth: 2, borderTopColor: '#e1e1e1',
            }}>
              <Text style={{ color: '#4a4a4a', fontSize: 18, fontWeight: '600',
              }}>BREWERY</Text>
              <View style={{ flexDirection: 'row', marginTop: 10, }}>
                <Image style={{ width: 56, height: 56, marginTop: 4,
                  marginLeft: 12, marginRight: 12, borderRadius: 56, }}
                  source={{ uri: `${STATIC_URL}/${data.brewery.brand_image}` }} />
                <View style={{ marginLeft: 6, }}>
                  <Text style={{ color: '#000', fontSize: 14, fontWeight: '900', }}>
                    {data.brewery.eng_name}
                  </Text>
                  <Text style={{ color: '#4a4a4a', fontSize: 14, fontWeight: '400',
                    marginTop: 4}}>
                    {data.brewery.kor_name}
                  </Text>
                  <Text style={{ color: '#949494', fontSize: 14, fontWeight: '100',
                    marginTop: 2}}>{data.brewery.location}</Text>
                  <Text style={{ color: '#949494', fontSize: 14, fontWeight: '100',
                    marginTop: 2}}>{data.brewery.phone}</Text>
                </View>
              </View>
            </View>
          ) : null
        }
      </View>
    )
  }
}
