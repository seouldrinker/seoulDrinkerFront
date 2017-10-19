import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  // components/news/header.js
  newsHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
  },
  newsHeaderImageContainer: {
    flex: 1,
    paddingTop: 12,
    paddingLeft: 16,
  },
  newsHeaderImage: {
    width: 48,
    height: 48,
    borderRadius: 25,
  },
  newsHeaderContentsContainer: {
    flex: 5,
    paddingTop: 18,
  },
  newsHeaderContentsName: {
    color: '#000',
    fontWeight: '900',
  },
  newsHeaderContentsDate: {
    marginTop: 2,
    fontSize: 12,
  },

  // components/news/images.js
  newsImageContainer: {
    flex: 1,
  },

  // components/news/contents.js
  newsContentsContainer: {
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  newsContents: {
    fontSize: 15,
    fontWeight: '200',
    color: '#000',
  },
})
