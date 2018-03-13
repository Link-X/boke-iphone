import { http } from '@/api/http'
export default {
  logIn ({ commit, state }, pageData) {
    return http.post('/user/getUser', pageData).then(res => res)
  }
}
