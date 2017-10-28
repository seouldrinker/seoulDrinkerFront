import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from "../actions"

import styles from '../styles/login'


class Login extends Component {
  constructor(props) {
    super(props)
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
      return 0
    })

    this._getFbCredential(async (fbUser) => {
      await _this.props.setLogin(fbUser, 'facebook')
      await _this.props.addUser({
        platform: 'facebook',
        access_token: fbUser.credentials.token,
      })
      await _this.props.navigation.navigate('Home', {
        user: fbUser,
        platform: 'facebook',
      })
      return 0
    })
  }

  async onFbLogin () {
    var _this = this
    const googleUser = await GoogleSignin.currentUserAsync()
    if (googleUser && googleUser.id) {
      await this.props.onGoogleLogout()
    }
    this.props.onFbLogout()
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
    })
  }

  async onGoogleLogin () {
    var _this = this
    await this.props.onFbLogout()

    const googleUser = await GoogleSignin.currentUserAsync()
    if (googleUser && googleUser.id) {
      await this.props.onGoogleLogout()
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
      }).catch((err) => {
        console.log('WRONG SIGNIN', err)
      }).done()
    } else {
      await GoogleSignin.signIn().then(async (user) => {
        console.log('google login!')
        await _this.props.setLogin(user, 'google')

        let picture = user.photo
        if (!picture || (picture.split('.jpg').length < 2
          || picture.split('.jpeg').length < 2
          || picture.split('.png').length < 2)) {
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
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err)
      })
      .done()
    }
  }

  render () {
    return (
      <Image style={styles.container}
        source={require('../images/login/background.png')}>
        <Image style={styles.logo}
          source={require('../images/login/logo.png')} />
        <View style={styles.loginButtonList}>
          <TouchableOpacity style={[styles.loginButton, {backgroundColor: '#3e5ccb'}]}
            onPress={this.onFbLogin.bind(this)}>
            <Image
              style={styles.loginButtonImage}
              source={require('../images/login/facebook.png')}
            />
          <Text style={{ color: '#fff', fontWeight: '800', }}>페이스북으로 시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginButton, {backgroundColor: '#ee741b'}]}
            onPress={this.onGoogleLogin.bind(this)}>
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
}

export default connect(state => ({
  auth: state.auth
}), dispatch => (
  bindActionCreators(actions, dispatch)
))(Login)
