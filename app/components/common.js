import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    ListView,
} from 'react-native'


export function makeTimer(propsDate) {
  const feedDate = new Date(propsDate)
  const feedHour = (feedDate.getHours() > 12) ?
    `오후 ${feedDate.getHours()-12}` :
    ((feedDate.getHours() === 0) ? `오전 12` : `오전 ${feedDate.getHours()}`)
  const feedMinutes = ((feedDate.getMinutes() < 10) ? '0': '') + feedDate.getMinutes()

  return `${feedDate.getMonth()+1}월 ${feedDate.getDate()}일 ${feedHour}:${feedMinutes}`
}

export class BaseList extends Component {
  componentDidMount () {
  }

  componentWillMount() {
    this._initDataSource(this.getListData())
  }

  _initDataSource(rows) {
    var dataSource = new ListView.DataSource({
      rowHasChanged : (row1, row2) => row1 !== row2,
    }).cloneWithRows(rows)

    this.setState({
      dataSource : dataSource,
      loading    : false
    })
  }

  render() {
    return (
      <ListView style={{ flex: 1 }}
        dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
    )
  }
}
