import axios from 'axios'

import { ROOT_URL, STATIC_URL, API_URL } from '../../config/config'


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
