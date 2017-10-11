import { combineReducers } from 'redux'
// import { NavigationActions } from 'react-navigation'

import { AppNavigator } from '../navigation/appNavigator'

// const firstAction = AppNavigator.router.getActionForPathAndParams('Main')
// const tempNavState = AppNavigator.router.getStateForAction(firstAction)
// const secondAction = AppNavigator.router.getActionForPathAndParams('Login')
// const initialNavState = AppNavigator.router.getStateForAction(
//   secondAction,
//   tempNavState
// )
//
// const nav = (state = initialNavState, action) => {
//   let nextState
//   switch (action.type) {
//     case 'Login':
//       nextState = AppNavigator.router.getStateForAction(
//         NavigationActions.back(),
//         state
//       )
//       break
//     case 'Logout':
//       nextState = AppNavigator.router.getStateForAction(
//         NavigationActions.navigate({ routeName: 'Login' }),
//         state
//       )
//       break
//     default:
//       nextState = AppNavigator.router.getStateForAction(action, state)
//       break
//   }
//   return nextState || state
// }

const initialAuthState = { user: null, platform: null, isLoggedIn: false, feedList: null }
const initialFeedListState = { feedList: null, currentPage: null, totalPage: null }

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
      }
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
    default:
      return state
  }
}

export default combineReducers({
  nav,
  auth,
  feedData,
})
