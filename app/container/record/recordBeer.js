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

export default class RecordBeer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      choicedBeerList: [],
    }
  }

  changeKeyword(keyword) {
    this.setState({ keyword })
    setTimeout(() => {
      this.props.getBeerList(this.state.keyword)
    }, 300)
  }

  setChangedBeerList(choicedBeerList) {
    this.setState({
      choicedBeerList,
    })
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={ this.props.beerModalVisible }
        onRequestClose={() => {
          this.setState({ keyword: '' })
          this.props.getBeerList()
          this.props.setBeerModalVisible(false)
        }}>
        <View style={{ width, height }}>
          <ModalHeader
            isBeer={true}
            choicedItems={this.state.choicedBeerList}
            setItems={this.props.setBeers}
            setModalVisible={this.props.setBeerModalVisible}
            itemList={this.props.beerData.beerList} />
          <SearchBar
            keyword={this.state.keyword}
            changeKeyword={this.changeKeyword.bind(this)} />
          <SearchList
            isBeer={true}
            setModalVisible={this.props.setBeerModalVisible}
            choicedItems={this.state.choicedBeerList}
            setChangedItems={this.setChangedBeerList.bind(this)}
            newItems={this.props.newBeers}
            itemList={this.props.beerData.beerList} />
        </View>
      </Modal>
    )
  }
}
