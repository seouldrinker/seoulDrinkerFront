import { combineReducers } from 'redux'

import { AppNavigator } from '../navigation/appNavigator'


const initialAuthState = { user: null, platform: null, isLoggedIn: false,
  feedList: null, pubCounter: null, beerCounter: null, }
const initialFeedListState = { feedList: null, currentPage: null,
  totalPage: null }
const initialNewsListState = { newsList: null, currentPage: null,
  totalPage: null }
const initialBeerListState = { beerRank: null, beerList: null, beerDetail: null, }
const initialPubListState = { pubRank: null, pubList: null, pubDetail: null, }

const nav = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state)
  return newState || state
}

const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        platform: action.platform,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        platform: null,
        signedUpUser: null,
      }
    case 'SIGNED_UP_USER':
      return {
        ...state,
        signedUpUser: action.signedUpUser,
      }
    case 'SET_USER_DETAIL':
      return {
        ...state,
        feedList: action.feedList,
        pubCounter: action.pubCounter,
        beerCounter: action.beerCounter,
      }
    case 'ADD_AUTH_FEED':
      const addNewFeedList = Object.assign([], state.feedList)
      addNewFeedList.unshift(action.feed)
      return {
        ...state,
        feedList: addNewFeedList,
      }
    case 'MODIFY_AUTH_FEED':
      const modifyNewFeedList = Object.assign([], state.feedList)
      const modifyFeedIndex = state.feedList.findIndex(feed => {
        return feed._id === action.feed._id
      })
      if (modifyFeedIndex > -1) {
        modifyNewFeedList[modifyFeedIndex] = action.feed
        return {
          ...state,
          feedList: modifyNewFeedList,
        }
      }
      return state
    case 'DELETE_AUTH_FEED_LIST':
      const deleteNewFeedList = Object.assign([], state.feedList)
      const deletedFeedIndex = state.feedList.findIndex(feed => {
        return feed._id === action.feedId
      })
      if (deletedFeedIndex > -1) {
        deleteNewFeedList.splice(deletedFeedIndex, 1)
        return {
          ...state,
          feedList: deleteNewFeedList,
        }
      }
      return state
    default:
      return state
  }
}

const feedData = (state = initialFeedListState, action) => {
  switch (action.type) {
    case 'SET_FEED_LIST':
      return {
        ...state,
        feedList: action.feedList,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
      }
    case 'ADD_FEED_LIST':
      return {
        ...state,
        feedList: state.feedList.concat(action.feedList),
        currentPage: action.currentPage,
        totalPage: action.totalPage,
      }
    case 'ADD_FEED':
      const addNewFeedList = Object.assign([], state.feedList)
      addNewFeedList.unshift(action.feed)
      return {
        ...state,
        feedList: addNewFeedList,
      }
    case 'MODIFY_FEED':
      const modifyNewFeedList = Object.assign([], state.feedList)
      const modifyFeedIndex = state.feedList.findIndex(feed => {
        return feed._id === action.feed._id
      })
      if (modifyFeedIndex > -1) {
        modifyNewFeedList[modifyFeedIndex] = action.feed
        return {
          ...state,
          feedList: modifyNewFeedList,
        }
      }
      return state
    case 'DELETE_FEED_LIST':
      const deleteNewFeedList = Object.assign([], state.feedList)
      const deletedFeedIndex = state.feedList.findIndex(feed => {
        return feed._id === action.feedId
      })
      if (deletedFeedIndex > -1) {
        deleteNewFeedList.splice(deletedFeedIndex, 1)
        return {
          ...state,
          feedList: deleteNewFeedList,
        }
      }
      return state
    default:
      return state
  }
}

const newsData = (state = initialNewsListState, action) => {
  switch (action.type) {
    case 'SET_NEWS_LIST':
      return {
        ...state,
        newsList: action.newsList,
        currentPage: action.currentPage,
        totalPage: action.totalPage,
      }
    default:
      return state
  }
}


const beerData = (state = initialBeerListState, action) => {
  switch (action.type) {
    case 'SET_BEER_RANK':
      return {
        ...state,
        beerRank: action.beerRank,
      }
    case 'SET_BEER_LIST':
      return {
        ...state,
        beerList: action.beerList,
      }
    case 'SET_BEER_DETAIL':
      return {
        ...state,
        beerDetail: action.beerDetail,
      }
    default:
      return state
  }
}


const pubData = (state = initialPubListState, action) => {
  switch (action.type) {
    case 'SET_PUB_RANK':
      return {
        ...state,
        pubRank: action.pubRank,
      }
    case 'SET_PUB_LIST':
      return {
        ...state,
        pubList: action.pubList,
      }
    case 'SET_PUB_DETAIL':
      return {
        ...state,
        pubDetail: action.pubDetail,
      }
    default:
      return state
  }
}

export default combineReducers({
  nav,
  auth,
  feedData,
  newsData,
  beerData,
  pubData,
})
