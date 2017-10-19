import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  // components/feed/header.js
  feedHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
  },
  feedHeaderImageContainer: {
    flex: 1,
    paddingTop: 12,
    paddingLeft: 16,
  },
  feedHeaderImage: {
    width: 48,
    height: 48,
    borderRadius: 25,
  },
  feedHeaderContentsContainer: {
    flex: 3,
    paddingTop: 18,
  },
  feedHeaderContentsName: {
    color: '#000',
    fontWeight: '900',
  },
  feedHeaderContentsDate: {
    marginTop: 2,
    fontSize: 12,
  },
  feedHeaderModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  feedHeaderModalTouchable: {
    width: 60,
    height: 70,
    paddingTop: 26,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  feedHeaderModalImage: {
    marginRight: 26,
    width: 3,
    height: 18,
  },

  // components/feed/images.js
  feedImageContainer: {
    flex: 1,
  },

  // components/feed/contents.js
  feedContentsContainer: {
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: '#fff',
  },
  feedContentsPubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedContentsPub: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
  },
  feedContentsBeerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedContentsBeer: {
    padding: 2,
    marginTop: 4,
    backgroundColor: 'rgba(238, 165, 27, 0.25)',
    color: '#000',
    fontWeight: '600',

  },
  feedContentsContextContainer: {
    paddingTop: 14,
  },
  feedContentsContext: {
    marginBottom: 30,
    fontSize: 15,
    fontWeight: '200',
    color: '#000',
  },
})
