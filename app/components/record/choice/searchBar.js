import React, { Component } from 'react'
import {
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', height: 60, borderBottomWidth: 1, borderBottomColor: '#eea51b', marginLeft: 18, marginRight: 18,  }}>
        <Image source={require('../../../images/record/search.png')}
          style={{ marginTop: 22, marginLeft: 2, marginBottom: 18  }}/>
        <TextInput
          maxLength={30}
          numberOfLines={1}
          placeholder={'검색'}
          placeholderTextColor={'#949494'}
          underlineColorAndroid={'rgba(0,0,0,0)'}
          style={{ flex: 5, marginTop: 10, marginLeft: 16, fontSize: 16, height: 40,
            color: '#000', fontWeight: '400', }}
          onChangeText={(keyword) => this.props.changeKeyword(keyword)}
          value={this.props.keyword}/>
      </View>
    )
  }
}
