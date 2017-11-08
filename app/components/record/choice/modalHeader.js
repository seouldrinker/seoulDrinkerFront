import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from "../../../actions"

const { width, height } = Dimensions.get('window')

class ModalHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ width, height: 55, flexDirection: 'row', elevation: 8, paddingTop: 14, backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => {
          this.props.setModalVisible(false)
        }}>
          <Image source={require('../../../images/record/cancel.png')}
            style={{ marginTop: 4, marginLeft: 20, }}/>
        </TouchableOpacity>
        <Text style={{ marginLeft: 15, flex: 3, fontSize: 20, fontWeight: '600', color: '#000' }}>{this.props.isBeer ? '벌컥 맥주' : '벌컥 펍'}</Text>
        <TouchableOpacity onPress={() => {
          let items = []
          this.props.itemList.map((v, k) => {
            if (this.props.isBeer) {
              items = (k === 0) ? [] : items
              if (this.props.choicedItems.includes(v._id)) {
                items.push(v)
              }
            } else {
              items = (k === 0) ? null : items
              if (this.props.choicedItems === v._id) {
                items = v
              }
            }
          })

          this.props.setItems(items)
          this.props.isBeer ?
            this.props.getBeerList() :
            this.props.getPubList()
          this.props.setModalVisible(false)
        }}>
          <Text style={{ marginRight: 18, fontSize: 20, fontWeight: '400', color: '#000' }}>완료</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(state => ({
  nav: state.nav,
  auth: state.auth,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(ModalHeader)
