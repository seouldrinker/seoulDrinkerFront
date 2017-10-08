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
import { requestPosts, receivePosts, breweries, beers, events } from '../actions'

import styles from '../styles/login'


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      platform: null,
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

    await this._getGoogleCredential((googleUser) => {
      _this.onFbLogout()
      _this.setState({ user: googleUser, platform: 'google' })
      _this.props.navigation.navigate('Home', {
        user: googleUser,
        platform: 'google',
      })
      return 0
    })

    this._getFbCredential((fbUser) => {
      _this.setState({ user: fbUser, platform: 'facebook' })
      this.props.navigation.navigate('Home', {
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
      await this.onGoogleLogout()
    }
    this.onFbLogout()
    FBLoginManager.loginWithPermissions(["email", "user_photos"],
      (error, user) => {
        console.log('facebook login!')
      if (!error) {
        _this.setState({ user, platform: 'facebook' })
        this.props.navigation.navigate('Home', { user, platform: 'facebook' })
      } else {
        console.log(error, user)
      }
    })
  }

  onFbLogout (cb) {
    var _this = this
    FBLoginManager.logout((error, user) => {
      if (!error) {
        console.log('facebook logout!')
        _this.setState({ user: null, platform: null })
      } else {
        console.log(error, user)
      }
    })
  }

  async onGoogleLogin () {
    var _this = this
    this.onFbLogout(() => {
      console.log('facebook logout!')
      _this.setState({ user: null, platform: null })
    })

    const googleUser = await GoogleSignin.currentUserAsync()
    if (googleUser && googleUser.id) {
      await this.onGoogleLogout(async () => {
        await GoogleSignin.signIn().then((user) => {
          console.log('google login!')
          _this.setState({ user, platform: 'google' })
          this.props.navigation.navigate('Home', { user, platform: 'google' })
        }).catch((err) => {
          console.log('WRONG SIGNIN', err)
        }).done()
      })
    } else {
      await GoogleSignin.signIn().then((user) => {
        console.log('google login!')
        _this.setState({ user, platform: 'google' })
        this.props.navigation.navigate('Home', { user, platform: 'google' })
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err)
      })
      .done()
    }
  }

  async onGoogleLogout (cb) {
    var _this = this
    await GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut())
      .then(() => {
      console.log('google logout!')
      _this.setState({ user: null, platform: null })
      if (cb && typeof cb === 'function') {
        cb()
      }
    }).done()
  }

  render () {
    return (
      <Image style={styles.container}
        source={require('../images/login/background.jpg')}>
        <Image style={styles.logo}
          source={require('../images/login/logo.png')} />
        <Image style={styles.comment}
          source={require('../images/login/comment.png')} />
        <View style={styles.loginButtonList}>
          <TouchableOpacity style={styles.loginButton}
            onPress={this.onFbLogin.bind(this)}>
            <Image
              style={styles.loginButtonImage}
              source={require('../images/login/facebook.png')}
            />
          <Text>페이스북으로 시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}
            onPress={this.onGoogleLogin.bind(this)}>
            <Image
              style={styles.loginButtonImage}
              source={require('../images/login/google.png')}
            />
          <Text>구글 계정으로 시작하기</Text>
          </TouchableOpacity>
        </View>
      </Image>
    )
  }
}
