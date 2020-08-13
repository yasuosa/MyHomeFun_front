import Cookies from 'js-cookie'

// 过期一天
var inFifteenMinutes = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
const TokenKey = 'myfunhome_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, {
      expires: inFifteenMinutes
     })
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
