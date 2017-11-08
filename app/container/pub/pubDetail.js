import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../../actions"

import ParallaxScrollView from 'react-native-parallax-scroll-view'
import BeerPubDetailComponent from '../../components/beerPub/detail'

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

class PubDetail extends Component {
  constructor(props) {
    super(props)
    this.backPage = this.backPage.bind(this)
    this.getRankDetail = this.getRankDetail.bind(this)

    this.props.navigation.setParams({
      initPubDetail: this.props.getPubDetail,
    })
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
  })

  componentDidMount () {
    this.props.getPubDetail(this.props.navigation.state.params._id)
  }

  backPage() {
    this.props.removePubDetail()
    this.props.navigation.goBack(null)
    return true
  }

  getRankDetail() {
    const index = this.props.pubRank.findIndex((v, k) => {
      return v.pub._id === this.props.navigation.state.params._id
    })
    return this.props.pubRank[index].rank
  }

  render() {
    const pub = this.props.pubDetail
    const rank = this.getRankDetail()

    if (pub) {
      return (
        <ParallaxScrollView
          onScroll={() => {}}
          backgroundColor='#949494'
          stickyHeaderHeight={56}
          parallaxHeaderHeight={250}
          backgroundSpeed={10}
          renderBackground={() => (
            <View style={{ height: 250, backgroundColor: '#fff', }}>
              <Image style={{ width, height: 170, }}
                source={{ uri: `${STATIC_URL}/${pub.brewery.brand_image}` }} />
            </View>
          )}
          renderForeground={() => (
            <View style={{ flexDirection: 'row', marginTop: 125, marginLeft: 10 }}>
              <Image style={{ width: 125, height: 125, marginLeft: 12, marginRight: 12,
                  borderRadius: 100, borderWidth: 4, borderColor: '#fff' }}
                source={{ uri: `${STATIC_URL}/${pub.brewery.logo_image}` }} />
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                style={{ marginTop: 68, marginRight: 20, width: 160,  }}>
                <View style={{ }}>
                  <Text style={{ fontSize: 18, fontWeight: '400', color: '#949494', }}>{pub.eng_name}</Text>
                  <Text style={{ fontSize: 20, fontWeight: '900', color: '#000', letterSpacing: -2, }}>{pub.kor_name}</Text>
                </View>
              </ScrollView>
            </View>
          )}
          renderStickyHeader={() => (
            <View style={{}}></View>
          )}
          renderFixedHeader={() => (
            <View style={{ position: 'absolute', flexDirection: 'row', top: 0, left: 0, paddingTop: 15, }}>
              <TouchableOpacity onPress={() => this.backPage()}>
                <Image style={{ width: 34, marginLeft: 20, }}
                  source={require('../../images/common/back.png')} />
              </TouchableOpacity>
              <Text style={{ marginLeft: 18, color: '#fff', fontSize: 22, fontWeight: '600' }} >Pub</Text>
            </View>
          )}
        >
        <BeerPubDetailComponent data={pub} isBeer={false} rank={rank} />
      </ParallaxScrollView>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', marginTop: 70, }}>
        <ActivityIndicator
          animating={!pub}
          color='#eea51b'
          size="large"
          style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 100, }}/>
      </View>
    )
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  pubDetail: state.pubData.pubDetail,
  pubRank: state.pubData.pubRank,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(PubDetail)
