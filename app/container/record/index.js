import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNavigationHelpers, } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'

import * as actions from "../../actions"

import styles from '../../styles/common'

import ChoicedBeer from '../../components/record/choicedBeer'
import ChoicedPub from '../../components/record/choicedPub'

import RecordBeer from './recordBeer'
import RecordPub from './recordPub'

const { width, height } = Dimensions.get('window')

class Record extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSource: null,
      context: null,
      beerModalVisible: false,
      pubModalVisible: false,
      newBeers: [],
      newPub: null,
    }

    this.props.navigation.setParams({
      handleInsertFeed: this.handleInsertFeed.bind(this),
    })
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>벌컥 기록</Text>,
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image source={require('../../images/record/cancel.png')}
          style={{ marginLeft: 20, }}/>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.handleInsertFeed() }>
        <Text style={{ marginRight: 18, fontSize: 20, fontWeight: '400', color: '#000' }}>게시</Text>
      </TouchableOpacity>
    ),
    headerTintColor: '#949494',
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 8,
    }
  })

  componentDidMount() {
    this.props.getPubList()
    this.props.getBeerList()
  }

  handleInsertFeed () {
    const _id = this.props.auth.signedUpUser ?
      this.props.auth.signedUpUser._id : null
    const beer_ids = this.state.newBeers ?
      this.state.newBeers.map((v, k) => {
        return v._id
      }) : []
    const pub_id = this.state.newPub ?
      this.state.newPub._id : null
    const context = this.state.context
    const feedImage = (this.state.imageSource) ?
      this.state.imageSource : null

    if (!_id || !pub_id || !beer_ids || !context || !feedImage) {
      alert('항목을 모두 입력해주세요!')
    }

    const data = new FormData()

    data.append('_id', _id)
    data.append('pub_id', pub_id)
    for (let i=0; i<beer_ids.length; i++) {
      data.append('beer_ids', beer_ids[i])
    }
    data.append('context', context)
    data.append('feedImage', {
      uri: feedImage.uri,
      type: feedImage.type,
      name: _id,
    })

    this.props.addFeed(data, () => {
      this.setState({
        imageSource: null,
        context: null,
        beerModalVisible: false,
        pubModalVisible: false,
        newBeers: [],
        newPub: null,
      })
      this.props.getFeedList()
      this.props.navigation.goBack(null)
    })
  }

  selectPhoto() {
    ImagePicker.launchImageLibrary({
      quality: 1.0,
      maxWidth: Math.ceil(width) + 100,
      maxHeight: Math.ceil(width) + 100,
    }, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        this.setState({
          imageSource: {
            uri: response.uri || null,
            type: response.type || null,
          }
        })
      }
    })
  }

  setBeerModalVisible(isTurnOn) {
    this.setState({ beerModalVisible: isTurnOn })
  }

  setPubModalVisible(isTurnOn) {
    this.setState({ pubModalVisible: isTurnOn })
  }

  setBeers(newBeers) {
    this.setState({ newBeers })
  }

  setPub(newPub) {
    this.setState({ newPub })
  }

  render() {
    return (
      <View style={{ width, height, backgroundColor: '#fff', }}>
        <View style={{ flexDirection: 'row', width, height: 132, borderBottomWidth: 2, borderBottomColor: '#e1e1e1' }}>
          <View style={{ padding: 10, width: width-132}}>
            <TextInput
              maxLength={150}
              multiline={true}
              numberOfLines={4}
              placeholder={'설명 입력...'}
              placeholderTextColor={'#949494'}
              style={{ width: width-132, height: 132, fontSize: 16, textAlignVertical: 'top', color: '#000', fontWeight: '400' }}
              onChangeText={(context) => this.setState({ context })}
              value={this.state.context}
            />
          </View>
          <TouchableOpacity style={{ width: 132, height: 132, }} onPress={this.selectPhoto.bind(this)}>
            <View style={{ }}>
            {
              this.state.imageSource === null ?
                <Text>Select a Photo</Text> :
                <Image style={{ width: 100, height: 100, margin: 16 }} source={{
                  uri: this.state.imageSource.uri
                }} />
            }
            </View>
          </TouchableOpacity>
        </View>
        <ChoicedPub
          setPubModalVisible={this.setPubModalVisible.bind(this)}
          newPub={this.state.newPub}
        />
        <ChoicedBeer
          setBeerModalVisible={this.setBeerModalVisible.bind(this)}
          newBeers={this.state.newBeers}
        />
        <RecordBeer
          setBeerModalVisible={this.setBeerModalVisible.bind(this)}
          beerModalVisible={this.state.beerModalVisible}
          getBeerList={this.props.getBeerList}
          beerData={this.props.beerData}
          setBeers={this.setBeers.bind(this)}
          newBeers={this.state.newBeers} />
        <RecordPub
          setPubModalVisible={this.setPubModalVisible.bind(this)}
          pubModalVisible={this.state.pubModalVisible}
          getPubList={this.props.getPubList}
          pubData={this.props.pubData}
          setPub={this.setPub.bind(this)}
          newPub={this.state.newPub} />
      </View>
    )
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
  beerData: state.beerData,
  pubData: state.pubData,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(Record)
