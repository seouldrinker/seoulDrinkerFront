import axios from 'axios'

export const ROOT_URL = 'http://192.168.0.14:3000/'
export const STATIC_URL = 'http://192.168.0.14:3000/static'
export const API_URL = 'http://192.168.0.14:3000/seoulDrinkerApi/vbeta'

export function setLogin(user, platform) {
  return {
    type: 'LOGIN',
    user,
    platform,
  }
}

export function setLogout() {
  return {
    type: 'LOGOUT',
  }
}

function _setFeedList({feedList, currentPage, totalPage}) {
  return {
    type: 'SET_FEED_LIST',
    feedList,
    currentPage,
    totalPage,
  }
}

export function getAllFeedList(page=1, count=20) {
  return (dispatch, getState) => {
    axios({
      method: 'GET',
      url: `${API_URL}/feed?page=${page}&count=${count}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json'
      },
    }).then(results => {
      if (results.data.code === 200) {
        dispatch(_setFeedList(results.data.results))
      }
    }).catch((err) => console.log(err))
  }
}
