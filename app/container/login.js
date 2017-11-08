import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { debounce } from 'lodash'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from "../actions"

import styles from '../styles/login'


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoging: false,
    }
  }

  async _getGoogleCredential (cb) {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true })
      await GoogleSignin.configure({
        androidClientId: '288716852533-ppbnh034e8n14j5qi3fm4hc33ghfolgn.apps.googleusercontent.com',
        offlineAccess: false
      })

      const googleUser = await GoogleSignin.currentUserAsync()
      if (googleUser && googleUser.id) {
        if (cb && typeof cb === 'function') {
          cb(googleUser)
        } else {
          return googleUser
        }
      }
    }
    catch(err) {
      console.log("Play services error", err.code, err.message)
    }
  }

  _getFbCredential (cb) {
    FBLoginManager.getCredentials((error, fbUser) => {
      if (!error && fbUser.credentials) {
        if (cb && typeof cb === 'function') {
          cb(fbUser)
        } else {
          return fbUser
        }
      }
    })
  }

  async componentDidMount () {
    var _this = this
    SplashScreen.hide()

    await this._getGoogleCredential(async (googleUser) => {
      _this.setState({ isLoging: true, })
      await _this.props.setLogin(googleUser, 'google')
      let picture = await googleUser.photo
      if (!picture || (picture.split('.jpg').length < 2
        && picture.split('.jpeg').length < 2
        && picture.split('.png').length < 2)) {
        picture = ''
      }
      await _this.props.addUser({
        id: googleUser.id,
        platform: 'google',
        email: googleUser.email,
        name: googleUser.name,
        picture,
      })
      await _this.props.navigation.navigate('Home', {
        user: googleUser,
        platform: 'google',
      })
      this.setState({ isLoging: false, })
      return 0
    })

    this._getFbCredential(async (fbUser) => {
      _this.setState({ isLoging: true, })
      await _this.props.setLogin(fbUser, 'facebook')
      await _this.props.addUser({
        platform: 'facebook',
        access_token: fbUser.credentials.token,
      })
      await _this.props.navigation.navigate('Home', {
        user: fbUser,
        platform: 'facebook',
      })
      _this.setState({ isLoging: false, })
      return 0
    })
  }

  async onFbLogin () {
    var _this = this
    _this.setState({ isLoging: true, })
    const googleUser = await GoogleSignin.currentUserAsync()
    if (googleUser && googleUser.id) {
      await this.props.onGoogleLogout()
    }
    this.props.onFbLogout()
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.WebView)
    FBLoginManager.loginWithPermissions(["email", "user_photos"],
      async (error, user) => {
        console.log('facebook login!')
      if (!error) {
        await _this.props.setLogin(user, 'facebook')
        await _this.props.addUser({
          platform: 'facebook',
          access_token: user.credentials.token,
        })
        await this.props.navigation.navigate('Home', { user, platform: 'facebook' })
      } else {
        console.log(error, user)
      }
      _this.setState({ isLoging: false, })
    })
  }

  async onGoogleLogin () {
    var _this = this
    _this.setState({ isLoging: true, })
    await this.props.onFbLogout()

    const googleUser = await GoogleSignin.currentUserAsync()
    if (googleUser && googleUser.id) {
      await this.props.onGoogleLogout()
    }
    await GoogleSignin.signIn().then(async (user) => {
      console.log('google login!')
      await _this.props.setLogin(user, 'google')

      let picture = user.photo
      if (!picture || (picture.split('.jpg').length < 2
        && picture.split('.jpeg').length < 2
        && picture.split('.png').length < 2)) {
        picture = ''
      }
      await _this.props.addUser({
        id: user.id,
        platform: 'google',
        email: user.email,
        name: user.name,
        picture,
      })
      await this.props.navigation.navigate('Home', { user, platform: 'google' })
      _this.setState({ isLoging: false, })
    }).catch((err) => {
      console.log('WRONG SIGNIN', err)
      this.setState({ isLoging: false, })
    }).done()
  }

  render () {
    if (!this.state.isLoging) {
      return (
        <Image style={styles.container}
          source={require('../images/login/background.png')}>
          <View style={styles.loginButtonList}>
            <TouchableOpacity style={[styles.loginButton, {backgroundColor: '#3e5ccb'}]}
              onPress={debounce(this.onFbLogin.bind(this), 3000, {
                leading: true,
                trailing: false
              })}>
              <Image
                style={styles.loginButtonImage}
                source={require('../images/login/facebook.png')}
              />
            <Text style={{ color: '#fff', fontWeight: '800', }}>페이스북으로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginButton, {backgroundColor: '#ee741b'}]}
              onPress={debounce(this.onGoogleLogin.bind(this), 3000, {
                leading: true,
                trailing: false
              })}>
              <Image
                style={styles.loginButtonImage}
                source={require('../images/login/google.png')}
              />
            <Text style={{ color: '#fff', fontWeight: '800', }}>구글 계정으로 시작하기</Text>
            </TouchableOpacity>
          </View>
        </Image>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center',
        alignItems: 'center', marginTop: 70, }}>
        <ActivityIndicator
          animating={!this.props.feedData || !this.props.feedData.feedList}
          color='#eea51b'
          size="large"
          style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', height: 100, }}/>
      </View>
    )
  }
}

export default connect(state => ({
  auth: state.auth
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(Login)
