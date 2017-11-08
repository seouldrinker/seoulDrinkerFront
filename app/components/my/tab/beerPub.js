import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import { STATIC_URL } from '../../../../config/config'
const { width, height } = Dimensions.get('window')

import { makeTimerNoSeconds } from '../../../components/common'

export default class MyBeerPubComponent extends Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
  })

  render() {
    let filteredDataList = []
    const dataList = this.props.dataList
    const dataCounter = this.props.dataCounter
    const dataIds = Object.keys(dataCounter)
    for (let i=0 ; i < dataList.length; i=i+3) {
      filteredDataList.push([dataList[i], dataList[i+1], dataList[i+2]])
    }
    const naviPage = this.props.naviPage

    return (
      <View style={{ backgroundColor: '#fff', }}>
        {
          filteredDataList.map((v, k) => {
            return (
              <View key={ k } style={{ flexDirection: 'row', width, marginTop: 24, }}>
                {
                  [0, 1, 2].map((v2, k2) => {
                    return v[v2] ? (
                      <TouchableOpacity key={k+k2} onPress={() => {
                          this.props.navigation.navigate(naviPage, { _id: v[v2]._id })
                        }} style={{ width: width/3, marginBottom: 18, }}>
                        {
                          dataIds.findIndex(dataId => dataId === v[v2]._id) >= 0 ? (
                            <View>
                              <Image style={{ width: width/3-36, height: width/3-36,
                                marginLeft: 18, marginRight: 18, }}
                                source={{ uri: naviPage === 'PubDetail' ?
                                  `${STATIC_URL}/${v[v2].brewery.logo_image}` :
                                  `${STATIC_URL}/${v[v2].image}` }} />
                              <Text style={{ marginTop: 20, marginLeft: 4, marginRight: 4,
                                textAlign: 'center', color: '#4a4a4a', fontWeight: '400',
                              }}>{v[v2].kor_name}</Text>
                              <View style={[{ position: 'absolute', marginLeft: 18,
                                width: width/3-36, height: width/3-36,
                                backgroundColor: "rgba(238, 165, 27, 0.5)",
                                borderWidth: 3, borderColor: '#eea51b',},
                                naviPage === 'PubDetail' && { borderRadius: width/3-36, }]}></View>
                              <Text style={{ marginTop: 2, textAlign: 'center',
                                color: '#eea51b', fontWeight: '900', }}>{makeTimerNoSeconds(dataCounter[v[v2]._id].date)}</Text>
                            </View>
                          ) : (
                            <View>
                              <Image style={{ width: width/3-36, height: width/3-36,
                                marginLeft: 18, marginRight: 18, }}
                                source={{ uri: naviPage === 'PubDetail' ?
                                  `${STATIC_URL}/${v[v2].brewery.logo_image}` :
                                  `${STATIC_URL}/${v[v2].image}` }} />
                              <Text style={{ marginTop: 20,  marginLeft: 4, marginRight: 4,
                                textAlign: 'center', color: '#4a4a4a', fontWeight: '400',
                              }}>{v[v2].kor_name}</Text>
                            </View>
                          )
                        }
                      </TouchableOpacity>
                    ) : null
                  })
                }
              </View>
            )
          })
        }
      </View>
    )
  }
}
