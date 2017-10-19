import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'

import ModalHeader from '../../components/record/choice/modalHeader'
import SearchBar from '../../components/record/choice/searchBar'
import SearchList from '../../components/record/choice/searchList'

const { width, height } = Dimensions.get('window')

export default class RecordPub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      choicedPub: null
    }
  }

  changeKeyword(keyword) {
    this.setState({ keyword })
    setTimeout(() => {
      this.props.getPubList(this.state.keyword)
    }, 300)
  }

  setChangedPub(choicedPub) {
    this.setState({
      choicedPub
    })
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={ this.props.pubModalVisible }
        onRequestClose={() => {
          this.setState({ keyword: '' })
          this.props.getPubList()
          this.props.setPubModalVisible(false)
        }}>
        <View style={{ width, height }}>
          <ModalHeader
            isBeer={false}
            choicedItems={this.state.choicedPub}
            setItems={this.props.setPub}
            setModalVisible={this.props.setPubModalVisible}
            itemList={this.props.pubData.pubList} />
          <SearchBar
            keyword={this.state.keyword}
            changeKeyword={this.changeKeyword.bind(this)} />
          <SearchList
            isBeer={false}
            setModalVisible={this.props.setPubModalVisible}
            choicedItems={this.state.choicedPub}
            setChangedItems={this.setChangedPub.bind(this)}
            newItems={this.props.newPub}
            itemList={this.props.pubData.pubList} />
        </View>
      </Modal>
    )
  }
}
