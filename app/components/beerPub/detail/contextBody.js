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
          <Text style={{ marginTop: 10, lineHeight: 26, }}>세븐브로이맥주는 1933년 우리나라 최초의 맥주회사 조선맥주가 설립된 이래 77년 만에 탄생한 순수국내자본 맥주기업이다. 하이트, OB에 이은 3번째 맥주인 셈이다. 세븐브로이맥주의 탄생은 2002년으로 거슬러 올라간다. 맥주를 가게에서 제조하고 판매할 수 있는 이른바 하우스맥주법이 통과된 것이 그 시초였다. 물론 관련 법안에 따른 소규모 양조를 통해 맥주를 외부에 유통 할 수는 없었지만 새로운 시장에 매력을 느낀 김강삼 대표는 법에 따라 서울역사와 발산역에 맥주 전문점을 열고소규모 하우스 양조장을 운영하기 시작했다. 크래프트 맥주 혹은 수제 맥주라는 단어조차 듣기 어렵던 시절 김 대표는 개성 있는 맛을 지닌 맥주로 맥주전문점을 성공적으로 운영할 수 있었다. 그런 김 대표를 창업의 길로 들어서게 한 것은 2010년에 들려온 한 가지 소식이었다. 주세법이 바뀌어 중소규모 양조장에서 생산된 맥주 역시 면허를 받고 외부로 유통이 가능하게 된 것이다.</Text>
        </View>
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
      </View>
    )
  }
}
