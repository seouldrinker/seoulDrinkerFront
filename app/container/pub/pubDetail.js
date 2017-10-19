import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../../actions"

import ParallaxScrollView from '../../modules/react-native-parallax-scroll'
import BeerPubDetailComponent from '../../components/beerPub/detail'

import { STATIC_URL } from '../../../config/config'
const { width, height } = Dimensions.get('window')

class PubDetail extends Component {
  constructor(props) {
    super(props)
    this.backPage = this.backPage.bind(this)

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

  render() {
    const pub = this.props.pubDetail
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
                  <Text style={{ fontSize: 18, fontWeight: '400', color: '#949494', }}>{pub.brewery.eng_name} {pub.eng_name}</Text>
                  <Text style={{ fontSize: 20, fontWeight: '900', color: '#000', letterSpacing: -2, }}>{pub.brewery.kor_name} {pub.kor_name}</Text>
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
        <BeerPubDetailComponent data={pub} isBeer={false} />
      </ParallaxScrollView>
      )
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  pubDetail: state.pubData.pubDetail,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(PubDetail)
