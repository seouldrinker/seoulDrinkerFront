import React, { Component } from 'react'
import {
  Text,
  ListView,
  View,
  Image
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from "../../actions"

import stylesCommon from '../../styles/common'

import FeedComponent from '../../components/feed'

class FeedList extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = ({ navigation }) => {
    return {
    }
  }

  componentDidMount () {
    SplashScreen.hide()
    if (!this.props.auth.isLoggedIn) {
      this.props.navigation.navigate('Login')
      return 0
    }
    this.props.getAllFeedList()
  }

  render() {
    if (!this.props.feedData.feedList) {
      return <Text>Loading...</Text>
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    return (
      <View>
        <ListView
          dataSource={ds.cloneWithRows(this.props.feedData.feedList)}
          renderRow={rowData => {return <FeedComponent data={rowData} />}}
        />
      </View>
    )
  }
}

export default connect(state => ({
  auth: state.auth,
  feedData: state.feedData,
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(FeedList)
