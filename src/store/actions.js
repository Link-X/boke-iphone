import { http } from '@/api/http'
export default {
  logIn ({ commit, state }, pageData) {
    return http.post('/user/getUser', pageData).then(res => res)
  },
  getFriend ({ commit, state }, pageData) {
    return http.post('/user/getFriend', pageData)
  },
  getRoom ({ commit, state }, pageData) {
    return http.post('/user/getFriend', pageData)
  },
  addFriend ({ commit, state }, pageData) {
    return http.post('/user/addFriend', pageData)
  },
  getFriendList ({ commit, state }, pageData) {
    return http.post('/user/friendList', pageData)
  }
}
