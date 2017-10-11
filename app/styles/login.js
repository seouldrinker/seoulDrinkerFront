import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  logo: {
    marginTop: 72,
    width: 255,
    height: 255,
  },
  comment: {
    marginTop: 20,
    width: 265,
  },
  loginButtonList: {
    marginTop: 80,
  },
  loginButton: {
    width: 290,
    height: 50,
    margin: 4,
    borderRadius: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
  },
  loginButtonImage: {
    marginRight: 12,
  },
  loginButtonText: {
    fontWeight: 'bold',
  }
})
